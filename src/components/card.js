export const card = (name, price, desc, imgRef) => {
  return `
    <div class="product-card">
        <img src="${imgRef}" alt="${name}" />
        <div class="product-info">
        <h3>${name}</h3>
        <p class="price">${price} €</p>
        <button class="add-to-cart">Ajouter au panier</button>
        </div>
    </div>
    `;
};
