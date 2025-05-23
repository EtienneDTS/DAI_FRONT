import { getLists } from "./api";
import { lists } from "./components/lists";

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
