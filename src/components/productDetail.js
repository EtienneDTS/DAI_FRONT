export const productDetail = (product) => {
    console.log(product, "produit");
    const wrapper = document.createElement("div");
    wrapper.className = "product-detail";
    let quantity = 1;

    const isBio = product.bio ? "Oui" : "Non";

    wrapper.innerHTML = `
    <div class="product-detail-content">
      <img src="${product.urlImage}" alt="${
        product.nom
    }" class="product-detail-image" />
      <div class="product-detail-info">
        <h2>${product.nom}</h2>
        <p class="product-price">${product.prixUnitaire} €</p>
        <ul class="product-attributes">
          <li><strong>Marque :</strong> ${product.marque}</li>
          <li><strong>Catégorie :</strong> ${
              product.idCate?.nomCate || "Non spécifiée"
          }</li>
          <li><strong>Bio :</strong> ${isBio}</li>
          <li><strong>NutriScore :</strong> ${product.nutri}</li>
          <li><strong>Poids :</strong> ${product.poids}g</li>
          <li><strong>Conditionnement :</strong> ${product.conditionnement}</li>
          <li><strong>Prix au kg :</strong> ${product.prixKg} €/kg</li>
        </ul>
        <p class="product-description">${
            product.description || "Pas de description disponible."
        }</p>

        <div class="quantity-controls">
          <button class="decrease-detail">-</button>
          <span class="qty-detail">1</span>
          <button class="increase-detail">+</button>
        </div>

        <button class="add-to-cart">Ajouter au panier</button>
      </div>
    </div>
  `;

    // Events
    const qtyDisplay = wrapper.querySelector(".qty-detail");
    const decreaseBtn = wrapper.querySelector(".decrease-detail");
    const increaseBtn = wrapper.querySelector(".increase-detail");
    const addBtn = wrapper.querySelector(".add-to-cart");

    decreaseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = quantity;
        }
    });

    increaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        quantity++;
        qtyDisplay.textContent = quantity;
    });

    addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(`Ajout au panier : ${product.nom} x${quantity}`);
    });

    return wrapper;
};
