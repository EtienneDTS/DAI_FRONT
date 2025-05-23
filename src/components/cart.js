import { modifyCartProduct, deleteProductFromCart } from "../api";

export const cart = (products, idPanier) => {
    console.log(products, "produits")
    const wrapper = document.createElement("div");
    wrapper.className = "cart-page";

    function renderCart() {
        const total = products.reduce((acc, p) => acc + p.produit.prixUnitaire * (p.quantite || 1), 0).toFixed(2);

        wrapper.innerHTML = `
      <h2>Mon panier</h2>
      <div class="cart-items">
        ${
            products?.length === 0
                ? `<p class="empty-cart">Votre panier est vide.</p>`
                : products?.map(
                          (p) => `
            <div class="cart-item" data-id="${p.produit.id}">
              <img src="${p.produit.urlImage}" alt="${p.produit.nom}">
              <div class="item-info">
                <h4>${p.produit.nom}</h4>
                <p>${p.produit.prixUnitaire} €</p>
                <div class="quantity-controls">
                  <button class="decrease">-</button>
                  <span class="qty">${p.quantite || 1}</span>
                  <button class="increase">+</button>
                </div>
              </div>
              <button class="remove-from-cart">✕</button>
            </div>
          `
                      )
                      .join("")
        }
      </div>
      ${
          products?.length > 0
              ? `<div class="cart-total">Total : <strong>${total} €</strong></div>`
              : ""
      }
      ${
          products?.length > 0 ?
          `<button class="order">Payer</button>`
          : ""
      }
    `;

        wrapper.querySelectorAll(".remove-from-cart").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idProduct = parseInt(btn.closest(".cart-item").dataset.id);
                const index = products.findIndex((p) => p.produit.id === idProduct);
                if (index !== -1) {
                    products.splice(index, 1);
                    renderCart();
                    deleteProductFromCart(idPanier, idProduct)
                }
            });
        });

        wrapper.querySelectorAll(".increase").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const idProduct = parseInt(btn.closest(".cart-item").dataset.id);
                const product = products.find((p) => p.produit.id === idProduct);
                const newQuantity = product.quantite + 1
                try {
                    console.log("avant")
                    product.quantite++;
                    renderCart();
                    await modifyCartProduct(idPanier, idProduct, newQuantity)
                    console.log("après")
                    
                    
                    
                
                } catch (error) {
                    console.log(error, "error")
                }
                
                
            });
        });

        wrapper.querySelectorAll(".decrease").forEach((btn) => {
            btn.addEventListener("click",async () => {
                const idProduct = parseInt(btn.closest(".cart-item").dataset.id);
                const product = products.find((p) => p.produit.id === idProduct);
                const newQuantity = product.quantite -1;
                try {
                    
                    if (product && product.quantite > 1) {
                    product.quantite--;
                    renderCart();
                    await modifyCartProduct(idPanier, idProduct, newQuantity)
                    
                    }
                } catch (error) {
                    console.log(error, "error")
                }
                
            });
        });
    }

    renderCart();
    return wrapper;
};
