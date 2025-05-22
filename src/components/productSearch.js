import { card } from "./card";

export const productSearch = (term, productTest) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-search-page";

  const filteredProducts = productTest.filter((p) =>
    p.nom.toLowerCase().includes(term)
  );

  let currentPage = 1;
  const perPage = 6;

  const render = () => {

    const previousStockFilter = wrapper.querySelector("#stockFilter");
    const stockChecked = previousStockFilter?.checked || false;


    wrapper.innerHTML = `
      <h2>Résultats pour "${term}"</h2>
      <div class="filters">
        <label><input type="checkbox" id="stockFilter" /> En stock</label>
      </div>
      <div class="product-grid"></div>
      <div class="pagination"></div>
    `;

    const stockFilter = wrapper.querySelector("#stockFilter");
    stockFilter.checked = stockChecked;


    let visibleProducts = [...filteredProducts];
    if (stockFilter.checked) {
      // voir pour ajouter les dispo dans le produit
      // visibleProducts = visibleProducts.filter((p) => p.inStock);
    }


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

    stockFilter.addEventListener("change", render);
  };

  render();
  return wrapper;
};
