export const card = (product) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-card";
  wrapper.id = product.id;

  let quantity = 1;

  const isUnavailable = product.inStock === false;

  wrapper.innerHTML = `
    <img src="${product.urlImage}" alt="${product.nom}" />
    <div class="product-info">
      <h3>${product.nom}</h3>
      <p class="price">${product.prixUnitaire} €</p>
      <div class="quantity-controls">
        <button class="decrease">-</button>
        <span class="qty">1</span>
        <button class="increase">+</button>
      </div>
      <button class="add-to-cart"${isUnavailable ? " disabled" : ""}>
        ${isUnavailable ? "Indisponible" : "Ajouter au panier"}
      </button>
    </div>
  `;

  if (isUnavailable) {
    wrapper.classList.add("unavailable");
  } else {
   
    wrapper.addEventListener("click", () => {
      window.location.href = `/product/${product.id}`;
    });
  }

  const qtyDisplay = wrapper.querySelector(".qty");
  const decreaseBtn = wrapper.querySelector(".decrease");
  const increaseBtn = wrapper.querySelector(".increase");
  const addBtn = wrapper.querySelector(".add-to-cart");

  if (!isUnavailable) {
    decreaseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
      }
    });

    increaseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      quantity++;
      qtyDisplay.textContent = quantity;
    });

    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Produit ajouté : ${product.id}, quantité : ${quantity}`);
    });
  } else {
    
    wrapper.querySelectorAll("button").forEach((btn) => {
      btn.setAttribute("disabled", true);
    });
  }

  return wrapper;
};
