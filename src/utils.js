import { getLists, getCart, addProductToList } from "./api";
import { lists } from "./components/lists";
import { cart } from "./components/cart";

export const resetList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const userId = user?.id;
    const listData = await getLists(userId);
    let listPage = document.querySelector(".lists-page");
    listPage.replaceWith(lists(listData));
    listPage = document.querySelector(".lists-page");
    const listIcon = document.querySelector(".list-container");
    listIcon.addEventListener("click", () => {
        listPage.classList.toggle("open");
    });
};

export const resetCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const cartData = await getCart(userId);
    let cartPage = document.querySelector(".cart-page");
    cartPage.replaceWith(cart(cartData.lignes, cartData.idPanier));
    cartPage = document.querySelector(".cart-page");
    const cartIcon = document.querySelector(".cart-container");
    cartIcon.addEventListener("click", () => {
       cartPage.classList.toggle("open");
    });
};

export const resetListNames = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const allList = await getLists(user.id);
    const listData = allList.map((l) => ({ nom: l.noml, id: l.id }));
    console.log(listData, "ici")
    const productCards = document.querySelectorAll(".product-card")
    productCards.forEach((card)=> {
        const productId = card.id;
        
        
        const listChoice = card.querySelector(".list-choices")
        listChoice.innerHTML = ""
        listData.forEach((listItem)=> {
            const li = document.createElement("li");
            li.textContent = listItem.nom;
            li.dataset.id = listItem.id;
            li.addEventListener("click", async (e) => {
                e.stopPropagation();
                const productQuantity = card.querySelector(".qty").textContent;
                await addProductToList(listItem.id, productId, productQuantity);
                const overlay = card.querySelector(".add-to-list-overlay");
                overlay.classList.remove("show");
                resetList();
            });
            
            listChoice.appendChild(li);
        })

    })
}

