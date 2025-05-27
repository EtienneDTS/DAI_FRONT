export const confirmOrder = (orderData) => {
    const wrapper = document.createElement("div");
    wrapper.className = "confirm-page";

    const { prixtotalPa, dateC, creneauChoisi, utilisateur, magasin, lignes } =
        orderData;

    wrapper.innerHTML = `
      <h2>Confirmation de commande</h2>
      <p>Merci <strong>${utilisateur.prenom} ${
        utilisateur.nom
    }</strong> pour votre commande !</p>
  
      <div class="order-summary">
        <h3>Détails de la commande</h3>
        <p><strong>Magasin :</strong> ${magasin.nomM} (${magasin.adresseM})</p>
        <p><strong>Date :</strong> ${dateC}</p>
        <p><strong>Créneau :</strong> ${creneauChoisi}h</p>
        <p><strong>Montant total :</strong> ${prixtotalPa.toFixed(2)} €</p>
      </div>
  
      <div class="order-items">
        <h3>Produits commandés</h3>
        <ul>
          ${lignes
              .map(
                  (item) => `
            <li>
              <div class="product-name">${item.produit.nom}</div>
              <div class="product-qty">x${item.quantite}</div>
              <div class="product-price">${item.produit.prixUnitaire.toFixed(
                  2
              )} €</div>
            </li>
          `
              )
              .join("")}
        </ul>
      </div>
  
      <p class="footer-msg">Vous recevrez un e-mail de confirmation à : <strong>${
          utilisateur.email
      }</strong></p>
    `;

    return wrapper;
};
