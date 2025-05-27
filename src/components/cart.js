import { modifyCartProduct, deleteProductFromCart, deleteCart } from "../api";
import { resetCart } from "../utils";

const findReplacement = (product) => {
  const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
  return allProducts.find(
    (p) =>
      p.id !== product.id &&
      p.categorie === product.categorie &&
      product.motsCles?.some((m) => p.motsCles?.includes(m))
  );
};

export const cart = (products, idPanier, dispo = {}) => {
  const wrapper = document.createElement("div");
  wrapper.className = "cart-page open";

  let selectedDate = null;
  let selectedSlot = null;

  function renderSlotSelector() {
    const dates = Object.keys(dispo || {}).sort();
    const slotHTML = `
      <div class="slot-selector">
        <label for="date-select">Choisir un jour :</label>
        <select id="date-select">
          <option value="">-- Sélectionner une date --</option>
          ${dates
            .map((date) => `<option value="${date}">${date}</option>`) 
            .join("")}
        </select>
        <label for="slot-select">Choisir un créneau :</label>
        <select id="slot-select" disabled>
          <option value="">-- Sélectionner une heure --</option>
        </select>
      </div>
    `;
    return slotHTML;
  }

  function renderCart() {
    const total = products.reduce(
      (acc, p) => acc + (p.produit.prixUnitaire * (p.quantite || 1)),
      0
    ).toFixed(2);

    wrapper.innerHTML = `
      <h2>Mon panier</h2>
      ${products?.length ? '<button class="empty-cart">Vider le panier </button>' : ''}
      <div class="cart-items">
        ${
          products?.length === 0
            ? `<p class="empty-cart">Votre panier est vide.</p>`
            : products.map((p) => {
                const replacement = !p.dispo ? findReplacement(p.produit) : null;
                return `
                <div class="cart-item" data-id="${p.produit.id}">
                  <img src="${p.produit.urlImage}" alt="${p.produit.nom}">
                  <div class="item-info">
                    <h4>${p.produit.nom} ${!p.dispo ? "<span class='unavailable'>(indisponible)</span>" : ""}</h4>
                    <p>${p.produit.prixUnitaire.toFixed(2)} €</p>
                    ${
                      p.dispo
                        ? `<div class="quantity-controls">
                            <button class="decrease">-</button>
                            <span class="qty">${p.quantite}</span>
                            <button class="increase">+</button>
                          </div>`
                        : ""
                    }
                  </div>
                  <button class="remove-from-cart">✕</button>
                </div>
                ${
                  replacement
                    ? `<div class="replacement-suggestion" data-replace-id="${replacement.id}" data-remove-id="${p.produit.id}">
                        <p>Produit de remplacement :</p>
                        <div class="replacement-product">
                          <img src="${replacement.urlImage}" alt="${replacement.nom}">
                          <div class="item-info">
                            <h4>${replacement.nom}</h4>
                            <p>${replacement.prixUnitaire.toFixed(2)} €</p>
                          </div>
                        </div>
                      </div>`
                    : ""
                }`;
              }).join("")
        }
      </div>
      ${renderSlotSelector()}
      ${
        products?.length
          ? `<div class="cart-total">Total : <strong>${total} €</strong></div>
             <button class="order" disabled>Payer</button>`
          : ""
      }
    `;

    const dateSelect = wrapper.querySelector("#date-select");
    const slotSelect = wrapper.querySelector("#slot-select");
    const orderButton = wrapper.querySelector(".order");

    dateSelect?.addEventListener("change", () => {
      selectedDate = dateSelect.value;
      const slots = dispo[selectedDate] || [];

      slotSelect.innerHTML = `<option value="">-- Sélectionner une heure --</option>`;
      slots.forEach((s) => {
        const option = document.createElement("option");
        option.value = s.id;
        option.textContent = s.nom;
        slotSelect.appendChild(option);
      });

      slotSelect.disabled = false;
    });

    slotSelect?.addEventListener("change", () => {
      selectedSlot = slotSelect.value;
      if (selectedSlot) orderButton.disabled = false;
    });

    wrapper.querySelectorAll(".remove-from-cart").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const idProduct = parseInt(btn.closest(".cart-item").dataset.id);
        const index = products.findIndex((p) => p.produit.id === idProduct);
        if (index !== -1) {
          products.splice(index, 1);
          renderCart();
          await deleteProductFromCart(idPanier, idProduct);
        }
      });
    });

    wrapper.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const idProduct = parseInt(btn.closest(".cart-item").dataset.id);
        const product = products.find((p) => p.produit.id === idProduct);
        product.quantite++;
        renderCart();
        await modifyCartProduct(idPanier, idProduct, product.quantite);
      });
    });

    wrapper.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const idProduct = parseInt(btn.closest(".cart-item").dataset.id);
        const product = products.find((p) => p.produit.id === idProduct);
        if (product.quantite > 1) {
          product.quantite--;
          renderCart();
          await modifyCartProduct(idPanier, idProduct, product.quantite);
        } else {
          products.splice(products.indexOf(product), 1);
          renderCart();
          await deleteProductFromCart(idPanier, idProduct);
        }
      });
    });

    wrapper.querySelector(".empty-cart")?.addEventListener("click", async () => {
      if (confirm("Voulez-vous supprimer tous les produits de votre panier ?")) {
        await deleteCart(idPanier);
        resetCart();
      }
    });

    wrapper.querySelectorAll(".replacement-suggestion").forEach((el) => {
      el.addEventListener("click", async () => {
        const replacementId = parseInt(el.dataset.replaceId);
        const toRemoveId = parseInt(el.dataset.removeId);
        const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        const replacement = allProducts.find((p) => p.id === replacementId);

        await deleteProductFromCart(idPanier, toRemoveId);
        await modifyCartProduct(idPanier, replacementId, 1);

        const index = products.findIndex((p) => p.produit.id === toRemoveId);
        products.splice(index, 1, {
          produit: replacement,
          quantite: 1,
          dispo: true,
          id: { panierId: idPanier, produitId: replacementId }
        });

        renderCart();
      });
    });

    orderButton?.addEventListener("click", () => {
      console.log("Créneau choisi:", selectedDate, selectedSlot);
      window.location.href = "/";
    });
  }

  renderCart();
  return wrapper;
};
