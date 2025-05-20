export const lists = (lists) => {
  const wrapper = document.createElement("div");
  wrapper.className = "lists-page";
  

    wrapper.innerHTML = `
      <h2>mes lists</h2>
      <div class="lists-items" >
        ${lists.length === 0
          ? `<p class="empty-cart">Vous n'avez aucune liste.</p>`
          : lists.map(l => `
            <div class="cart-item" data-id="${l.id}">
              <img src="${p.image}" alt="${p.name}">
              <div class="item-info">
                <h4>${l.name}</h4>
                <p>${p.price.toFixed(2)} €</p>
                <div class="quantity-controls">
                  <button class="decrease">-</button>
                  <span class="qty">${p.quantity || 1}</span>
                  <button class="increase">+</button>
                </div>
              </div>
              <button class="remove-from-cart">✕</button>
            </div>
          `).join('')}
      </div>
      ${products.length > 0 ? `<div class="cart-total">Total : <strong>${total} €</strong></div>` : ""}
    `;

  return wrapper;
};
