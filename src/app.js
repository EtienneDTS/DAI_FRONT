import { card } from "./components/card";
import { carousel } from "./components/carousel";
import { loginPage } from "./components/loginPage";
import { cart } from "./components/cart";
import { productDetail } from "./components/productDetail";

document.addEventListener("DOMContentLoaded", () => {

    let cartProducts = [
        {
          id: 1,
          name: "Bananes bio",
          price: 1.99,
          image: "https://media.carrefour.fr/medias/eac51db226553234ba8990ed218556a5/p_1500x1500/3523680438224-0.jpg",
          quantity: 3
        },
        {
          id: 2,
          name: "Lait demi-écrémé 1L",
          price: 0.89,
          image: "https://media.carrefour.fr/medias/793f987022d5461eb216d30fb8ee9cab/p_1500x1500/03533631574000_H1L1_s02.jpeg",
          quantity: 2
        },
        {
          id: 5,
          name: "Jambon supérieur x4",
          price: 2.99,
          image: "https://images.openfoodfacts.org/images/products/325/622/463/2047/front_fr.47.400.jpg",
          quantity: 1
        }
      ];

    const body = document.querySelector("body")
    
    const App = document.querySelector("#App");
    const path = window.location.pathname;
    const logo = document.querySelector(".logo");
    const cartIcon = document.querySelector(".cart-container");


    body.appendChild(cart(cartProducts))
    const cartPage = document.querySelector(".cart-page")

    cartIcon.addEventListener("click", () => cartPage.classList.toggle("open"))

    logo.addEventListener("click", () => (window.location.href = "/"));
    console.log(path, "path");


    // HOME
    if (path === "/") {
        const productTest = [
            {
                id: 1,
                name: "Bananes bio",
                price: 1.99,
                description: "",
                image: "https://media.carrefour.fr/medias/eac51db226553234ba8990ed218556a5/p_1500x1500/3523680438224-0.jpg",
                category: "Fruits",
                inStock: true,
                promo: false,
                disponibility: true
            },
            {
                id: 2,
                name: "Lait demi-écrémé 1L",
                price: 0.89,
                description: "",
                image: "https://media.carrefour.fr/medias/793f987022d5461eb216d30fb8ee9cab/p_1500x1500/03533631574000_H1L1_s02.jpeg",
                category: "Crèmerie",
                inStock: true,
                promo: true,
                disponibility: true
            },
            {
                id: 3,
                name: "Yaourt nature x4",
                price: 1.45,
                image: "https://medias.reussir.fr/lesmarches/styles/normal_size/azblob/2023-06/lq9837107c__lmh377_medi_danone_niv3.jpeg.webp?itok=_9ocAcUh",
                category: "Crèmerie",
                inStock: false,
                promo: false,
                disponibility: true
            },
            {
                id: 4,
                name: "Pâtes torsadées 500g",
                price: 1.1,
                description: "",
                image: "https://strasbourg.lecodrive.daybyday-shop.com/wp-content/uploads/2021/11/60999-torsades-qualite-superieur.jpg",
                category: "Épicerie",
                inStock: true,
                promo: false,
                disponibility: true
            },
            {
                id: 5,
                name: "Jambon supérieur x4",
                price: 2.99,
                description: "",
                image: "https://images.openfoodfacts.org/images/products/325/622/463/2047/front_fr.47.400.jpg",
                category: "Charcuterie",
                inStock: true,
                promo: true,
                disponibility: false
            },
        ];
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
        const maxStep = productTest.length * (scrollStep)
        explore.appendChild(carousel(exploreCarousel, exploreBtn, scrollStep, maxStep));
        recommandations.appendChild(
            carousel(recommandationCarousel, recommandationBtn, scrollStep, maxStep)
        );

        const exploreTrack = document.querySelector(
            `.carousel-track.${exploreCarousel}`
        );
        const recommandationsTrack = document.querySelector(
            `.carousel-track.${recommandationCarousel}`
        );

        productTest.forEach((element) => {
            exploreTrack.appendChild(card(
                element
            ));
        });

        productTest.forEach((element) => {
            recommandationsTrack.appendChild(card(
                element
            ));
        });
    }

    //LOGIN
    else if (path === "/login") {
        const nav = document.querySelector(".navbar");
        if (nav) nav.style.display = "none";
        App.appendChild(loginPage());
    }

    // PRODUCT DETAIL
    else if (path.startsWith("/product")) {

        // Appel d'api pour les produits de recommandation
        const recommandationsProduct = [
            {
                id: 1,
                name: "Bananes bio",
                price: 1.99,
                description: "",
                image: "https://media.carrefour.fr/medias/eac51db226553234ba8990ed218556a5/p_1500x1500/3523680438224-0.jpg",
                category: "Fruits",
                inStock: true,
                promo: false,
                disponibility: true
            },
            {
                id: 2,
                name: "Lait demi-écrémé 1L",
                price: 0.89,
                description: "",
                image: "https://media.carrefour.fr/medias/793f987022d5461eb216d30fb8ee9cab/p_1500x1500/03533631574000_H1L1_s02.jpeg",
                category: "Crèmerie",
                inStock: true,
                promo: true,
                disponibility: true
            },
            {
                id: 3,
                name: "Yaourt nature x4",
                price: 1.45,
                image: "https://medias.reussir.fr/lesmarches/styles/normal_size/azblob/2023-06/lq9837107c__lmh377_medi_danone_niv3.jpeg.webp?itok=_9ocAcUh",
                category: "Crèmerie",
                inStock: false,
                promo: false,
                disponibility: true
            },
            {
                id: 4,
                name: "Pâtes torsadées 500g",
                price: 1.1,
                description: "",
                image: "https://strasbourg.lecodrive.daybyday-shop.com/wp-content/uploads/2021/11/60999-torsades-qualite-superieur.jpg",
                category: "Épicerie",
                inStock: true,
                promo: false,
                disponibility: true
            },
            {
                id: 5,
                name: "Jambon supérieur x4",
                price: 2.99,
                description: "",
                image: "https://images.openfoodfacts.org/images/products/325/622/463/2047/front_fr.47.400.jpg",
                category: "Charcuterie",
                inStock: true,
                promo: true,
                disponibility: false
            },
        ];
        const productId = path.split("/")[1]
        // Appelle d'api pour product id 
        const prod = {
                id: 2,
                name: "Lait demi-écrémé 1L",
                price: 0.89,
                description: "",
                image: "https://media.carrefour.fr/medias/793f987022d5461eb216d30fb8ee9cab/p_1500x1500/03533631574000_H1L1_s02.jpeg",
                category: "Crèmerie",
                inStock: true,
                promo: true,
                disponibility: true
            }

        App.appendChild(productDetail(prod))
        App.innerHTML += `
        <div class="recommandations">
            <h2>Ces produits pourrait vous intéresser</h2>
        </div>`
        const recommandations = document.querySelector(".recommandations");
        const scrollStep = 250;
        const maxStep = recommandationsProduct.length * (scrollStep)
        const recommandationCarousel = "recommandationCarousel";
        const recommandationBtn = "recommandationBtn";
        recommandations.appendChild(
            carousel(recommandationCarousel, recommandationBtn, scrollStep, maxStep)
        );
        const recommandationsTrack = document.querySelector(
            `.carousel-track.${recommandationCarousel}`
        );
        recommandationsProduct.forEach((element) => {
            recommandationsTrack.appendChild(card(
                element
            ));
        });


    }
});
