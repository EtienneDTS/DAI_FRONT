export const OrderCard = (order, onStatusChange) => {
    const wrapper = document.createElement("div");
    wrapper.className = "order-card";

    wrapper.innerHTML = `
      <h3>Commande #${order.id}</h3>
      <p><strong>Client :</strong> ${order.nomClient}</p>
      <p><strong>Date :</strong> ${new Date(
          order.date
      ).toLocaleDateString()}</p>
      <ul class="order-products">
        ${order.produits
            .map(
                (p) => `
            <li>${p.nom} - ${p.quantite} x ${p.prixUnitaire.toFixed(2)} €</li>
          `
            )
            .join("")}
      </ul>
      <div class="order-actions">
        ${
            order.statut === "attente"
                ? `<button class="move-to-encours">Passer en cours</button>`
                : order.statut === "encours"
                ? `<button class="move-to-pret">Marquer comme prêt</button>`
                : `<span class="ready-status">Prêt</span>`
        }
      </div>
    `;

    const btnEncours = wrapper.querySelector(".move-to-encours");
    const btnPret = wrapper.querySelector(".move-to-pret");

    if (btnEncours) {
        btnEncours.addEventListener("click", () =>
            onStatusChange(order.id, "encours")
        );
    }
    if (btnPret) {
        btnPret.addEventListener("click", () =>
            onStatusChange(order.id, "pret")
        );
    }

    return wrapper;
};
