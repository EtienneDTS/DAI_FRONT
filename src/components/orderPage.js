export const OrderPage = (orders, onStatusChange) => {
    const wrapper = document.createElement("div");
    wrapper.className = "order-page";

    wrapper.innerHTML = `
      <div class="order-tabs">
        <button class="tab-btn active" data-tab="attente">🕒 En attente</button>
        <button class="tab-btn" data-tab="encours">🚚 En cours</button>
        <button class="tab-btn" data-tab="pret">✅ Prêtes</button>
      </div>
      <div class="order-lists">
        <div class="order-section active" data-tab="attente"></div>
        <div class="order-section" data-tab="encours"></div>
        <div class="order-section" data-tab="pret"></div>
      </div>
    `;

    const tabButtons = wrapper.querySelectorAll(".tab-btn");
    const sections = wrapper.querySelectorAll(".order-section");

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            sections.forEach((sec) => {
                sec.classList.toggle(
                    "active",
                    sec.dataset.tab === btn.dataset.tab
                );
            });
        });
    });

    sections.forEach((section) => {
        const statut = section.dataset.tab;
        const filtered = orders.filter((o) => o.statut === statut);
        filtered.forEach((order) => {
            section.appendChild(OrderCard(order, onStatusChange));
        });
    });

    return wrapper;
};
