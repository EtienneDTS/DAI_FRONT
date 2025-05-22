import { addList, getLists } from "../api";

export const lists = (lists) => {
    
    const wrapper = document.createElement("div");
    wrapper.className = "lists-page";

    function renderLists() {
    wrapper.innerHTML = `
        <h2>Mes listes</h2>
        <button class="add-list">Ajouter une liste</button>
        <form class="add-list-form hidden">
            <input type="text" placeholder="Nom de la liste" class="new-list-name" required />
            <button type="submit" class="validate-new-list">Valider</button>
        </form>
        <div class="lists-items">
            ${
                lists?.length === 0
                    ? `<p class="empty-lists">Vous n'avez aucune liste.</p>`
                    : lists
                          .map(
                              (l) => `
                <div class="list-item" data-id="${l.id}">
                    <div class="list-header">
                        <div class="list-info">
                            <h4 class="toggle-products">${l.noml}</h4>
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
                                <img src="${p.urlImage}" alt="${p.nom}">
                                <div class="item-info">
                                    <h4>${p.nom}</h4>
                                    <p>${p.prixUnitaire} €</p>
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
                            l.produits?.length
                                ? `<button class="add-list-to-cart">Ajouter ma liste au panier</button>`
                                : ""
                        }
                    </div>
                </div>
            `
                          )
                          .join("")
            }
        </div>
    `;

    // Toggle formulaire
    wrapper.querySelector(".add-list").addEventListener("click", () => {
        wrapper.querySelector(".add-list-form").classList.toggle("hidden");
    });

    // Soumission du formulaire
    wrapper.querySelector(".add-list-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = wrapper.querySelector(".new-list-name");
        
        const idU = JSON.parse(localStorage.getItem("user")).id
        await addList(idU, input.value)
        input.value = "";

        wrapper.querySelector(".add-list-form").classList.add("hidden");
        lists = await getLists(idU);
        renderLists();
    });

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
