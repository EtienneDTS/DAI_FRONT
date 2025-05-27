import { card } from "./components/card";
import { carousel } from "./components/carousel";
import { loginPage } from "./components/loginPage";
import { cart } from "./components/cart";
import { lists } from "./components/lists";
import { productDetail } from "./components/productDetail";
import { productSearch } from "./components/productSearch";
import {
    getProducts,
    getOneProduct,
    getLists,
    getDeals,
    getShops,
    getOrders,
    loginUserA,
    getRecommendedProducts,
} from "./api";
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
    const listIcon = document.querySelector(".list-container");
    
    const prods = await getProducts();
    localStorage.setItem("allProducts", JSON.stringify(prods));

    const searchText = document.querySelector(".input-text");

    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
        window.location.href = `/search/${searchText.value}`;
    });

    let listwrapper = lists([]);
    const cartWrapper = cart([]);
    cartWrapper.classList.remove("open");
    body.appendChild(cartWrapper);
    body.appendChild(listwrapper);

    let listPage = document.querySelector(".lists-page");

    resetCart();
    listIcon.addEventListener("click", () => {
        listPage.classList.toggle("open");
    });

    logo.addEventListener("click", () => (window.location.href = "/"));
    const magasins = await getShops();
    if (localStorage?.getItem("user") !== null) {
        const user = JSON.parse(localStorage.getItem("user"));
        user?.email?.includes("pickandgo.temp")
            ? (loginText.textContent = "connexion")
            : (loginText.textContent = user.nom);
        userRole = user?.role;

        body.appendChild(userOption(user, magasins));
        login.addEventListener("click", () => {
            if (user?.email?.includes("pickandgo.temp")) {
                window.location.href = "/login";
            }

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
        login.addEventListener("click", () => {
            window.location.href = "/login";
        });
        const user = JSON.parse(localStorage.getItem("user"));

        userRole = user?.role;

        listIcon.style.display = "none";
        loginText.textContent = "connexion";

        const popup = document.createElement("div");
        popup.className = "shop-selection-overlay";
        popup.innerHTML = `
            <div class="shop-selection">
                <h2>Choisissez votre magasin</h2>
                <select class="shop-dropdown">
                    ${magasins
                        .map(
                            (m) =>
                                `<option value="${m.id}">${m.nomM} à ${
                                    Math.floor(Math.random() * 10) + 1
                                } km</option>`
                        )
                        .join("")}
                </select>
                <button class="confirm-shop">Valider</button>
            </div>
        `;
        document.body.appendChild(popup);

        popup
            .querySelector(".confirm-shop")
            .addEventListener("click", async () => {
                const magId = popup.querySelector(".shop-dropdown").value;

                const aUser = await loginUserA(magId);

                console.log(aUser.utilisateur, "Auser");
                localStorage.setItem("user", JSON.stringify(aUser.utilisateur));
                document.body.removeChild(popup);
                window.location.href = "/";
            });
    }

    // ROUTES

    // HOME
    if (path === "/") {
        const user = JSON.parse(localStorage.getItem("user"));
        const deals = await getDeals();
        const products = await getProducts();

        const prod = await getRecommendedProducts(user?.id);
        const scrollStep = 250;

        App.innerHTML = `
            <div class="homepage-section hero-promo">
                <img src="${deals[0]?.urlImagePromotion}" alt="${deals[0]?.nomPromotion}" />
            </div>
    
            <div class="explore">
                <h2>Explorer nos produits</h2>
            </div>
    
            <div class="homepage-section secondary-promo">
                <img src="${deals[1]?.urlImagePromotion}" alt="${deals[1]?.nomPromotion}" />
            </div>
    
            <div class="recommandations">
                <h2>Ces produits pourraient vous intéresser</h2>
            </div>
    
            <div class="homepage-section final-promos">
                <img src="${deals[2]?.urlImagePromotion}" alt="${deals[2]?.nomPromotion}" />
                <img src="${deals[3]?.urlImagePromotion}" alt="${deals[3]?.nomPromotion}" />
            </div>
        `;

        const exploreTrackName = "exploreCarousel";
        const recommandationTrackName = "recommandationCarousel";
        const exploreTrack = carousel(
            exploreTrackName,
            "exploreBtn",
            scrollStep,
            products.length * scrollStep
        );
        const recommandationTrack = carousel(
            recommandationTrackName,
            "recoBtn",
            scrollStep,
            products.length * scrollStep
        );

        document.querySelector(".explore").appendChild(exploreTrack);
        document
            .querySelector(".recommandations")
            .appendChild(recommandationTrack);

        const exploreTrackEl = document.querySelector(
            `.carousel-track.${exploreTrackName}`
        );
        const recoTrackEl = document.querySelector(
            `.carousel-track.${recommandationTrackName}`
        );

        products.forEach((product) => {
            exploreTrackEl.appendChild(card(product));
        });

        prod.forEach((product) => {
            recoTrackEl.appendChild(card(product));
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
        const user = JSON.parse(localStorage.getItem("user"));
        const recommandationsProduct = await getRecommendedProducts(user.id);

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
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role !== "gérant") window.location.href = "/dashboard";
        const nav = document.querySelector(".navbar");
        if (nav) nav.style.display = "none";
        App.innerHTML = "";
        App.appendChild(await managerDashboard());
        document.querySelector(".avatar").addEventListener("click", () => {
            document.querySelector(".user-menu").classList.toggle("show");
        });
    }

    //ORDERS
    else if (path === "/orders") {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user, "user");
        const ordersData = await getOrders(user.magasin.id);
        App.innerHTML = "";
        console.log(ordersData, "ordersDAta");
        App.appendChild(OrderPage(ordersData));
    }
});
