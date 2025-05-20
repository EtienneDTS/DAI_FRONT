import { card } from "./card";

export const productSearch = (term, productTest) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-search-page";

  const filteredProducts = productTest.filter((p) =>
    p.name.toLowerCase().includes(term)
  );

  let currentPage = 1;
  const perPage = 6;

  const render = () => {
    wrapper.innerHTML = `
      <h2>Résultats pour "${term}"</h2>
      <div class="filters">
        <label><input type="checkbox" id="promoFilter" /> En promo</label>
        <label><input type="checkbox" id="stockFilter" /> En stock</label>
      </div>
      <div class="product-grid"></div>
      <div class="pagination"></div>
    `;

    let visibleProducts = [...filteredProducts];
    if (wrapper.querySelector("#promoFilter")?.checked)
      visibleProducts = visibleProducts.filter((p) => p.promo);
    if (wrapper.querySelector("#stockFilter")?.checked)
      visibleProducts = visibleProducts.filter((p) => p.inStock);

    const totalPages = Math.ceil(visibleProducts.length / perPage);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    const grid = wrapper.querySelector(".product-grid");
    visibleProducts.slice(start, end).forEach((p) => {
      grid.appendChild(card(p)); // ta fonction `card(product)`
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

    wrapper.querySelectorAll("input[type=checkbox]").forEach((input) => {
      input.addEventListener("change", render);
    });
  };

  render();
  return wrapper;
};
