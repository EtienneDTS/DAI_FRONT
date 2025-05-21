export const lists = (lists) => {
    const wrapper = document.createElement("div");
    wrapper.className = "lists-page";

    function renderLists() {
        wrapper.innerHTML = `
        <h2>Mes listes</h2>
        <div class="lists-items">
          ${
              lists?.length === 0
                  ? `<p class="empty-lists">Vous n'avez aucune liste.</p>`
                  : lists
                        ?.map(
                            (l) => `
              <div class="list-item" data-id="${l.id}">
                <div class="list-header">
                  <div class="list-info">
                    <h4 class="toggle-products">${l.nom}</h4>
                    <p>${l.produits?.length || 0} produit(s)</p>
                  </div>
                  <button class="remove-from-list">✕</button>
                </div>
                <div class="list-products hidden">
                  ${
                      l.produits && l.produits.length
                          ? l.produits
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
                          : "<p class='empty-products'>Aucun produit</p>"
                  }
                ${
                    l.produits?.length &&
                    `<button class="add-list-to-cart">Ajouter ma liste au panier</button>`
                }
                
                </div>
              </div>
            `
                        )
                        .join("")
          }
        </div>
      `;

        wrapper.querySelectorAll(".remove-from-list").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.closest(".list-item").dataset.id);
                const index = lists.findIndex((l) => l.id === id);
                if (index !== -1) {
                    lists.splice(index, 1);
                    renderLists();
                }
            });
        });

        wrapper.querySelectorAll(".list-info").forEach((title) => {
            title.addEventListener("click", () => {
                const parent = title.closest(".list-item");
                const section = parent.querySelector(".list-products");
                section.classList.toggle("hidden");
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

    renderLists();
    return wrapper;
};
