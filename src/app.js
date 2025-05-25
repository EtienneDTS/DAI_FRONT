import { card } from "./components/card";
import { carousel } from "./components/carousel";
import { loginPage } from "./components/loginPage";
import { cart } from "./components/cart";
import { lists } from "./components/lists";
import { productDetail } from "./components/productDetail";
import { productSearch } from "./components/productSearch";
import { getProducts, getOneProduct, getLists } from "./api";
import { userOption } from "./components/userOption";
import { notesPage } from "./components/notesPage";
import { resetCart, resetList, resetListNames } from "./utils";
import { managerDashboard } from "./components/managerDashboard";
import { OrderPage } from "./components/orderPage";

let userRole;
document.addEventListener("DOMContentLoaded", async () => {
    const body = document.querySelector("body");
    const App = document.querySelector("#App");
    const path = window.location.pathname;
    const logo = document.querySelector(".logo");
    const login = document.querySelector(".login");
    const loginText = document.querySelector(".login-text");
    const cartIcon = document.querySelector(".cart-container");
    const listIcon = document.querySelector(".list-container");

    const searchText = document.querySelector(".input-text");

    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
        window.location.href = `/search/${searchText.value}`;
    });

    let listwrapper = lists([]);
    const cartWrapper = cart([]);
    body.appendChild(cartWrapper);
    body.appendChild(listwrapper);
    const cartPage = document.querySelector(".cart-page");
    let listPage = document.querySelector(".lists-page");

    cartIcon.addEventListener("click", () => cartPage.classList.toggle("open"));
    listIcon.addEventListener("click", () => {
        listPage.classList.toggle("open");
    });

    logo.addEventListener("click", () => (window.location.href = "/"));
    if (localStorage.getItem("user") !== null) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user, "user");
        loginText.textContent = user.nom;
        userRole = user.role;
        body.appendChild(userOption(user));
        login.addEventListener("click", () => {
            document.querySelector(".user-menu").classList.toggle("show");
        });
        document.querySelector("#loginIMG").src = "/person-fill-check.svg";
        const allList = await getLists(user.id);

        const listData = allList.map((l) => ({ nom: l.noml, id: l.id }));
        localStorage.setItem("lists", JSON.stringify(listData));
        resetCart();
        resetList();
        listPage = document.querySelector(".lists-page");
    } else {
        console.log("ici");
        login.addEventListener("click", () => {
            window.location.href = "/login";
        });
        listIcon.style.display = "none";
        loginText.textContent = "connexion";
    }

    // ROUTES

    // HOME
    if (path === "/") {
        const products = await getProducts();
        const scrollStep = 250;
        const exploreCarousel = "exploreCarousel";
        const exploreBtn = "expoloreBtn";
        const recommandationCarousel = "recommandationCarousel";
        const recommandationBtn = "recommandationBtn";
        App.innerHTML = `
        <div class="explore">
            <h2>Explorer nos produits</h2>
        </div>
        <div class="recommandations">
            <h2>Ces produits pourrait vous intéresser</h2>
        </div>
        `;

        const explore = document.querySelector(".explore");
        const recommandations = document.querySelector(".recommandations");
        const maxStep = products.length * scrollStep;
        explore.appendChild(
            carousel(exploreCarousel, exploreBtn, scrollStep, maxStep)
        );
        recommandations.appendChild(
            carousel(
                recommandationCarousel,
                recommandationBtn,
                scrollStep,
                maxStep
            )
        );

        const exploreTrack = document.querySelector(
            `.carousel-track.${exploreCarousel}`
        );
        const recommandationsTrack = document.querySelector(
            `.carousel-track.${recommandationCarousel}`
        );

        products.forEach((element) => {
            exploreTrack.appendChild(card(element));
        });

        products.forEach((element) => {
            recommandationsTrack.appendChild(card(element));
        });
        resetListNames();
    }

    //LOGIN
    else if (path === "/login") {
        const nav = document.querySelector(".navbar");
        if (nav) nav.style.display = "none";
        App.appendChild(loginPage());
    }

    // PRODUCT DETAIL
    else if (path.startsWith("/product")) {
        const recommandationsProduct = await getProducts();

        const productId = path.split("/")[2];

        const prod = await getOneProduct(productId);

        App.appendChild(productDetail(prod));

        const recommandationsTitle = document.createElement("div");
        recommandationsTitle.classList.add("recommandations");
        recommandationsTitle.innerHTML = `<h2>Ces produits pourrait vous intéresser</h2>`;
        App.appendChild(recommandationsTitle);

        const recommandations = document.querySelector(".recommandations");
        const scrollStep = 250;
        const maxStep = recommandationsProduct.length * scrollStep;
        const recommandationCarousel = "recommandationCarousel";
        const recommandationBtn = "recommandationBtn";
        recommandations.appendChild(
            carousel(
                recommandationCarousel,
                recommandationBtn,
                scrollStep,
                maxStep
            )
        );
        const recommandationsTrack = document.querySelector(
            `.carousel-track.${recommandationCarousel}`
        );
        recommandationsProduct.forEach((element) => {
            recommandationsTrack.appendChild(card(element));
        });
    }

    // SEARCH
    else if (path.startsWith("/search")) {
        const productName = (path.split("/")[2] || "").toLowerCase();
        const products = await getProducts();
        App.appendChild(productSearch(productName, products));
    }

    // POSTITS (NOTE)
    else if (path.startsWith("/notes")) {
        const idList = path.split("/")[2] || "";
        App.appendChild(await notesPage(idList));
    }

    //DASHBOARD
    else if (path === "/dashboard") {
        App.innerHTML = "";
        App.appendChild(await managerDashboard());
    }

    //ORDERS
    else if (path === "/orders") {
        App.innerHTML = "";
        App.appendChild(await OrderPage());
    }
});
