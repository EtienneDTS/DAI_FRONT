import { addProductToCart } from "../api";
import { resetCart } from "../utils";

export const card = (product) => {
    const wrapper = document.createElement("div");
    wrapper.className = "product-card";
    wrapper.id = product.id;
    let quantity = 1;
    const isUnavailable = product.inStock === false;

    wrapper.innerHTML = `
      ${
          JSON.parse(localStorage.getItem("user")) !== null
              ? '<div class="card-favorite-icon" title="Ajouter à une liste"><img src="/postcard-heart-fill.svg" /></div>'
              : ""
      }
      
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
      <div class="add-to-list-overlay">
        <div class="overlay-content">
          <p>Ajouter à une liste </p>
          <ul class="list-choices"></ul>
        </div>
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

        addBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const idUser = JSON.parse(localStorage.getItem("user")).id;

            await addProductToCart(idUser, product.id, qtyDisplay.textContent);
            resetCart();

            console.log(
                `Produit ajouté : ${product.id}, quantité : ${quantity}`
            );
        });
    } else {
        wrapper.querySelectorAll("button").forEach((btn) => {
            btn.setAttribute("disabled", true);
        });
    }

    const heartIcon = wrapper.querySelector(".card-favorite-icon");
    const overlay = wrapper.querySelector(".add-to-list-overlay");

    heartIcon?.addEventListener("click", (e) => {
        e.stopPropagation();
        overlay.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) {
            overlay.classList.remove("show");
        }
    });

    return wrapper;
};
