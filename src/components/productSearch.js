import { card } from "./card";

export const productSearch = (term, productTest) => {
    const wrapper = document.createElement("div");
    wrapper.className = "product-search-page";

    let filteredProducts = productTest.filter(
        (p) =>
            p.nom.toLowerCase().includes(term.toLowerCase()) ||
            p.motsCles?.some((m) => m.toLowerCase().includes(term)) ||
            p.marque.toLowerCase().includes(term.toLowerCase())
    );

    let currentPage = 1;
    const perPage = 6;

    let state = {
        stock: false,
        bio: false,
        category: "",
        sort: "az",
    };

    const render = () => {
        wrapper.innerHTML = `
      <h2>Résultats pour "${term}"</h2>
      <div class="filters">
        <label><input type="checkbox" id="stockFilter" ${
            state.stock ? "checked" : ""
        } /> En stock</label>
        <label><input type="checkbox" id="bioFilter" ${
            state.bio ? "checked" : ""
        } /> Bio</label>
        <label>Catégorie :
          <select id="categoryFilter">
            <option value="">Toutes</option>
            ${[...new Set(productTest.map((p) => p.categorie))]
                .map(
                    (c) =>
                        `<option value="${c}" ${
                            state.category === c ? "selected" : ""
                        }>${c}</option>`
                )
                .join("")}
          </select>
        </label>
        <label>Tri :
          <select id="sortFilter">
            <option value="az" ${
                state.sort === "az" ? "selected" : ""
            }>Nom A-Z</option>
            <option value="za" ${
                state.sort === "za" ? "selected" : ""
            }>Nom Z-A</option>
            <option value="priceAsc" ${
                state.sort === "priceAsc" ? "selected" : ""
            }>Prix croissant</option>
            <option value="priceDesc" ${
                state.sort === "priceDesc" ? "selected" : ""
            }>Prix décroissant</option>
          </select>
        </label>
      </div>
      <div class="product-grid"></div>
      <div class="pagination"></div>
    `;

        // Sélections DOM
        const stockFilter = wrapper.querySelector("#stockFilter");
        const bioFilter = wrapper.querySelector("#bioFilter");
        const categoryFilter = wrapper.querySelector("#categoryFilter");
        const sortFilter = wrapper.querySelector("#sortFilter");

        // Appliquer filtres à la volée
        let visibleProducts = [...filteredProducts];
        if (state.stock) {
            visibleProducts = visibleProducts.filter(
                (p) => p.inStock !== false
            );
        }
        if (state.bio) {
            visibleProducts = visibleProducts.filter((p) => p.bio);
        }
        if (state.category) {
            visibleProducts = visibleProducts.filter(
                (p) => p.categorie === state.category
            );
        }

        switch (state.sort) {
            case "az":
                visibleProducts.sort((a, b) => a.nom.localeCompare(b.nom));
                break;
            case "za":
                visibleProducts.sort((a, b) => b.nom.localeCompare(a.nom));
                break;
            case "priceAsc":
                visibleProducts.sort((a, b) => a.prixUnitaire - b.prixUnitaire);
                break;
            case "priceDesc":
                visibleProducts.sort((a, b) => b.prixUnitaire - a.prixUnitaire);
                break;
        }

        // Pagination
        const totalPages = Math.ceil(visibleProducts.length / perPage);
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;

        const grid = wrapper.querySelector(".product-grid");
        visibleProducts.slice(start, end).forEach((p) => {
            grid.appendChild(card(p));
        });

        const pagination = wrapper.querySelector(".pagination");
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.disabled = true;
            btn.addEventListener("click", () => {
                currentPage = i;
                render();
            });
            pagination.appendChild(btn);
        }

        stockFilter.addEventListener("change", () => {
            state.stock = stockFilter.checked;
            render();
        });
        bioFilter.addEventListener("change", () => {
            state.bio = bioFilter.checked;
            render();
        });
        categoryFilter.addEventListener("change", () => {
            state.category = categoryFilter.value;
            render();
        });
        sortFilter.addEventListener("change", () => {
            state.sort = sortFilter.value;
            render();
        });
    };

    render();
    return wrapper;
};
