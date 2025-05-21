export const productDetail = (product) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-detail";
  console.log("ici")
  let quantity = 1;

  wrapper.innerHTML = `
    <div class="product-detail-content">
      <img src="${product.urlImage}" alt="${product.nomP}" class="product-detail-image" />
      <div class="product-detail-info">
        <h2>${product.nomP}</h2>
        <p class="product-price">${product.prixUnitaireP.toFixed(2)} €</p>
        <p class="product-description">${product.description || "Pas de description disponible."}</p>
        
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
  console.log({ decreaseBtn, increaseBtn, addBtn, qtyDisplay });

  decreaseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      
      quantity--;
      qtyDisplay.textContent = quantity;
    }
  });

  increaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    console.log("ici");
    
    quantity++;
    qtyDisplay.textContent = quantity;
  });

  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(`Ajout au panier : ${product.name} x${quantity}`);
    
  });

  return wrapper;
};
