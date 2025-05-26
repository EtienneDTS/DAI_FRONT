import {
    addList,
    getLists,
    deleteList,
    modifyList,
    deleteProductFromList,
    transfertListToCart
} from "../api";
import { resetListNames } from "../utils";


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
                            <div class="cart-item" data-id="${p.produit.id}">
                                <img src="${p.produit.urlImage}" alt="${
                                              p.produit.nom
                                          }">
                                <div class="item-info">
                                    <h4>${p.produit.nom}</h4>
                                    <p>${p.produit.prixUnitaire} €</p>
                                    <div class="quantity-controls">
                                        <button class="decrease">-</button>
                                        <span class="qty">${
                                            p.quantite || 1
                                        }</span>
                                        <button class="increase">+</button>
                                    </div>
                                </div>
                                <button class="remove-from-list-cart" id="btn${
                                    p.produit.id
                                }">✕</button>
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
                        <button class="notes-btn">Notes</button>
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
        wrapper
            .querySelector(".add-list-form")
            .addEventListener("submit", async (e) => {
                e.preventDefault();
                const input = wrapper.querySelector(".new-list-name");
                const idU = JSON.parse(localStorage.getItem("user"))
                    .id;
                await addList(idU, input.value);
                input.value = "";

                wrapper.querySelector(".add-list-form").classList.add("hidden");
                lists = await getLists(idU);
                
                resetListNames()
                renderLists();
            });

        wrapper.querySelectorAll(".remove-from-list").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = parseInt(btn.closest(".list-item").dataset.id);
                const index = lists.findIndex((l) => l.id === id);
                try {
                    await deleteList(id);
                    if (index !== -1) {
                        console.log("la")
                        lists.splice(index, 1);
                        resetListNames()
                        renderLists();
                        
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        });

        wrapper.querySelectorAll(".remove-from-list-cart").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const listId = parseInt(btn.closest(".list-item").dataset.id);
                const productId = parseInt(
                    btn.closest(".cart-item").dataset.id
                );

                try {
                    await deleteProductFromList(listId, productId);
                    const list = lists.find((l) => l.id === listId);
                    if (list) {
                        list.produits = list.produits.filter(
                            (p) => p.produit.id !== productId
                        );
                        renderLists();
                    }
                } catch (error) {
                    console.log(
                        "Erreur suppression produit dans liste :",
                        error
                    );
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

        wrapper.querySelectorAll(".notes-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const listId = parseInt(btn.closest(".list-item")?.dataset.id);
                window.location.href = `/notes/${listId}`;
            });
        });

        wrapper.querySelectorAll(".add-list-to-cart").forEach((btn)=> {
            btn.addEventListener("click", async () => {
                const listId = parseInt(btn.closest(".list-item")?.dataset.id);
                const user = JSON.parse(localStorage.getItem("user"));
                const userCartId = user?.panierActifId
                console.log(userCartId, listId)
                await transfertListToCart(userCartId, listId)
            });
        })

        wrapper.querySelectorAll(".increase").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const cartItem = btn.closest(".cart-item");
                const idProduct = parseInt(cartItem.dataset.id);
                const listId = parseInt(btn.closest(".list-item")?.dataset.id);

                const qtySpan = cartItem.querySelector(".qty");
                let currentQty = parseInt(qtySpan.textContent) || 1;

                currentQty++;
                qtySpan.textContent = currentQty;

                await modifyList(listId, idProduct, currentQty);
            });
        });

        wrapper.querySelectorAll(".decrease").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const cartItem = btn.closest(".cart-item");
                const idProduct = parseInt(cartItem.dataset.id);
                const listId = parseInt(btn.closest(".list-item")?.dataset.id);

                const qtySpan = cartItem.querySelector(".qty");
                let currentQty = parseInt(qtySpan.textContent) || 1;

                currentQty--;
                qtySpan.textContent = currentQty;

                await modifyList(listId, idProduct, currentQty);
            });
        });
    }

    renderLists();

    return wrapper;
};
