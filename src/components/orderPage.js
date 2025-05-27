import { startCommande, endCommande } from "../api";

export const OrderPage = (ordersData) => {
  const STATUSES = ["COMMANDE", "EN_PREPARATION", "PRET"];
  const TITLES = {
    COMMANDE: "À faire",
    EN_PREPARATION: "En cours",
    PRET: "Prête"
  };

  const wrapper = document.createElement("div");
  wrapper.className = "order-grid";

  const updateOrderStatus = (idPanier, newStatus) => {
    const order = ordersData.find((o) => o.idPanier === idPanier);
    if (order) {
      order.status = newStatus;
      render(); 
    }
  };

  const renderOrder = (order) => {
    const card = document.createElement("div");
    card.className = "order-card";

    const client = order.utilisateur;
    card.innerHTML = `
      <h4>Commande #${order.idPanier}</h4>
      <p>Client : ${client.prenom} ${client.nom}</p>
      <p>Total : ${order.prixtotalPa.toFixed(2)} €</p>
    `;

    const buttons = document.createElement("div");
    buttons.className = "button-group";

    STATUSES.forEach((s) => {
      
      if (s !== order.status && order.status === "COMMANDE" && s === "EN_PREPARATION") {
        const btn = document.createElement("button");
        btn.className = "order-button";
        btn.textContent = ` ${TITLES[s]}`;
        btn.addEventListener("click", () => {
            startCommande(order.idPanier)
            updateOrderStatus(order.idPanier, s)
        });
        buttons.appendChild(btn);
      } 
      else if (s !== order.status && order.status === "EN_PREPARATION" && s === "PRET") {
        const btn = document.createElement("button");
        btn.className = "order-button";
        btn.textContent = ` ${TITLES[s]}`;
        btn.addEventListener("click", () => {
            endCommande(order.idPanier)
            updateOrderStatus(order.idPanier, s)
        });
        buttons.appendChild(btn);
      }
    });

    card.appendChild(buttons);
    return card;
  };

  const render = () => {
    wrapper.innerHTML = "";

    STATUSES.forEach((status) => {
      const column = document.createElement("div");
      column.className = "order-column";

      const title = document.createElement("h2");
      title.className = "column-title";
      title.textContent = TITLES[status];

      column.appendChild(title);

      const filteredOrders = ordersData.filter((o) => o.status === status);
      filteredOrders.forEach((order) => {
        column.appendChild(renderOrder(order));
      });

      wrapper.appendChild(column);
    });
  };

  render();
  return wrapper;
};
