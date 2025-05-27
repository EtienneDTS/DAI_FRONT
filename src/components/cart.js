import {
    modifyCartProduct,
    deleteProductFromCart,
    deleteCart,
    order,
} from "../api";
import { resetCart } from "../utils";
import { confirmOrder } from "./confirm";

const findReplacements = (product) => {
    const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
    
    return allProducts
        .filter(
            (p) =>
                p.id !== product.id &&
                p.categorie === product.nomCategorie &&
                product.motsCles?.some((m) => p.motsCles?.includes(m))
        )
        .slice(0, 3);
};

export const cart = (products, idPanier, dispo = {}, shopDispo = []) => {
    const wrapper = document.createElement("div");
    const hasUnavailable = products.some((p) => !p.dispo);
    wrapper.className = "cart-page open";

    let selectedDate = null;
    let selectedSlot = null;

    function renderSlotSelector() {
        const dates = Object.keys(dispo || {}).sort();
        return `
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
    }

    function renderCart() {
        const total = products
            .reduce(
                (acc, p) => acc + p.produit.prixUnitaire * (p.quantite || 1),
                0
            )
            .toFixed(2);

        const allShops = JSON.parse(localStorage.getItem("shops")) || [];
        const availableShops = shopDispo.map((s) => s.idM);
        const suggestions = allShops.filter((s) =>
            availableShops.includes(s.id)
        );

        wrapper.innerHTML = `
      <h2>Mon panier</h2>
      ${
          products?.length
              ? '<button class="empty-cart">Vider le panier</button>'
              : ""
      }
      <div class="cart-items">
        ${
            products?.length === 0
                ? `<p class="empty-cart">Votre panier est vide.</p>`
                : products
                      .map((p) => {
                          const replacements = !p.dispo
                              ? findReplacements(p.produit)
                              : [];
                          return `
                <div class="cart-item" data-id="${p.produit.id}">
                  <img src="${p.produit.urlImage}" alt="${p.produit.nom}">
                  <div class="item-info">
                    <h4>${p.produit.nom} ${
                              !p.dispo
                                  ? "<span class='unavailable'>(indisponible)</span>"
                                  : ""
                          }</h4>
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
                  <button class="remove-from-cart">&times;</button>
                </div>
                ${
                    replacements.length > 0
                        ? `
                  <div class="replacement-suggestions">
                    <p>Produits de remplacement :</p>
                    ${replacements
                        .map(
                            (r) => `
                      <div class="replacement-product" data-id="${
                          r.id
                      }" style="cursor:pointer">
                        <img src="${r.urlImage}" alt="${r.nom}">
                        <div class="item-info">
                          <h4>${r.nom}</h4>
                          <p>${r.prixUnitaire.toFixed(2)} €</p>
                        </div>
                      </div>
                    `
                        )
                        .join("")}
                  </div>
                `
                        : ""
                }
              `;
                      })
                      .join("")
        }
      </div>
      ${renderSlotSelector()}
      ${
          hasUnavailable && suggestions.length > 0
              ? `<div class="shop-suggestions">
                  <h3>Vos produits sont disponibles dans les magasins suivants :</h3>
                  <ul>
                    ${suggestions
                        .map(
                            (s) =>
                                `<li class="shop-switch" data-id="${s.id}" style="cursor:pointer">${s.nomM} (${s.adresseM})</li>`
                        )
                        .join("")}
                  </ul>
                </div>`
              : ""
      }
      ${
          products?.length
              ? `<div class="cart-total">Total : <strong>${total} €</strong></div><button class="order" disabled>Payer</button>`
              : ""
      }
    `;

        wrapper.querySelectorAll(".remove-from-cart").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const idProduct = parseInt(
                    btn.closest(".cart-item").dataset.id
                );
                const index = products.findIndex(
                    (p) => p.produit.id === idProduct
                );
                if (index !== -1) {
                    products.splice(index, 1);
                    await deleteProductFromCart(idPanier, idProduct);
                    renderCart();
                }
            });
        });

        wrapper.querySelectorAll(".increase").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const idProduct = parseInt(
                    btn.closest(".cart-item").dataset.id
                );
                const product = products.find(
                    (p) => p.produit.id === idProduct
                );
                product.quantite++;
                await modifyCartProduct(idPanier, idProduct, product.quantite);
                renderCart();
            });
        });

        wrapper.querySelectorAll(".decrease").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const idProduct = parseInt(
                    btn.closest(".cart-item").dataset.id
                );
                const product = products.find(
                    (p) => p.produit.id === idProduct
                );
                if (product.quantite > 1) {
                    product.quantite--;
                    await modifyCartProduct(
                        idPanier,
                        idProduct,
                        product.quantite
                    );
                } else {
                    products.splice(products.indexOf(product), 1);
                    await deleteProductFromCart(idPanier, idProduct);
                }
                renderCart();
            });
        });

        wrapper.querySelectorAll(".replacement-product").forEach((el) => {
            el.addEventListener("click", () => {
                const productId = el.dataset.id;
                window.location.href = `/product/${productId}`;
            });
        });

        wrapper
            .querySelector(".empty-cart")
            ?.addEventListener("click", async () => {
                if (
                    confirm(
                        "Voulez-vous supprimer tous les produits de votre panier ?"
                    )
                ) {
                    await deleteCart(idPanier);
                    resetCart();
                }
            });

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

        wrapper.querySelectorAll(".shop-switch").forEach((li) => {
            li.addEventListener("click", () => {
                const shops = JSON.parse(localStorage.getItem("shops"));
                const selectedShop = shops.find((s) => s.id == li.dataset.id);
                const user = JSON.parse(localStorage.getItem("user"));
                user.magasin = selectedShop;
                localStorage.setItem("user", JSON.stringify(user));
                window.location.reload();
            });
        });

        orderButton?.addEventListener("click", async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const ord = await order(
                user.magasin.id,
                idPanier,
                selectedDate,
                selectedSlot
            );
            await deleteCart(idPanier);
            await resetCart();
            const app = document.querySelector("#App");
            app.innerHTML = "";
            app.appendChild(confirmOrder(ord));
        });
    }

    renderCart();
    return wrapper;
};
