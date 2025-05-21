export const cart = (products) => {
    const wrapper = document.createElement("div");
    wrapper.className = "cart-page";

    function renderCart() {
        const total = products
            .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
            .toFixed(2);

        wrapper.innerHTML = `
      <h2>Mon panier</h2>
      <div class="cart-items">
        ${
            products.length === 0
                ? `<p class="empty-cart">Votre panier est vide.</p>`
                : products
                      .map(
                          (p) => `
            <div class="cart-item" data-id="${p.id}">
              <img src="${p.image}" alt="${p.name}">
              <div class="item-info">
                <h4>${p.name}</h4>
                <p>${p.price.toFixed(2)} €</p>
                <div class="quantity-controls">
                  <button class="decrease">-</button>
                  <span class="qty">${p.quantity || 1}</span>
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
          products.length > 0
              ? `<div class="cart-total">Total : <strong>${total} €</strong></div>`
              : ""
      }
      ${
          products?.length > 0 &&
          `<button class="order">Payer</button>`
      }
    `;

        wrapper.querySelectorAll(".remove-from-cart").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.closest(".cart-item").dataset.id);
                const index = products.findIndex((p) => p.id === id);
                if (index !== -1) {
                    products.splice(index, 1);
                    renderCart();
                }
            });
        });

        wrapper.querySelectorAll(".increase").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.closest(".cart-item").dataset.id);
                const product = products.find((p) => p.id === id);
                if (product) {
                    product.quantity = (product.quantity || 1) + 1;
                    renderCart();
                }
            });
        });

        wrapper.querySelectorAll(".decrease").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.closest(".cart-item").dataset.id);
                const product = products.find((p) => p.id === id);
                if (product && product.quantity > 1) {
                    product.quantity--;
                    renderCart();
                }
            });
        });
    }

    renderCart();
    return wrapper;
};
