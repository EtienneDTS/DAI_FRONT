
import { getCategories } from "../api.js";


export function stockDashboard(previsions) {
    const container = document.createElement("div");
    container.classList.add("stock-dashboard");

    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-container");

    const select = document.createElement("select");
select.multiple = true;

// ⬇ On récupère les catégories de l'API
getCategories()
  .then(categories => {
    select.innerHTML = `
      <option value="all" selected>📋 Toutes les catégories</option>
      ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join("")}
    `;
  })
  .catch(err => {
    select.innerHTML = `<option disabled>⚠️ Erreur chargement</option>`;
    console.error("Erreur catégories :", err);
  });


    filterContainer.appendChild(document.createTextNode("Filtrer par catégorie : "));
    filterContainer.appendChild(select);
    container.appendChild(filterContainer);

    select.addEventListener("change", () => {
        const selected = Array.from(select.selectedOptions).map(o => o.value);
        let filtered = [];

        if (selected.includes("all") || selected.length === 0) {
            filtered = previsions;
        } else {
            filtered = previsions.filter(p => selected.includes(p.categorie));
        }

        renderTable(filtered);
    });

    const legend = document.createElement("div");
    legend.classList.add("legend");
    legend.innerHTML = `
        <p><span class="legend-box normal"></span> Stock normal</p>
        <p><span class="legend-box bientot-rupture"></span> Stock bas (≤ 10)</p>
        <p><span class="legend-box rupture"></span> Rupture (0)</p>
    `;
    container.appendChild(legend);

    const ruptureAlert = document.createElement("div");
    ruptureAlert.classList.add("rupture-alert");
    container.appendChild(ruptureAlert);

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Produit</th>
                <th>Stock actuel</th>
                <th>J+1</th>
                <th>J+2</th>
                <th>J+3</th>
                <th>J+4</th>
                <th>J+5</th>
                <th>J+6</th>
                <th>J+7</th>
                <th>Rupture prévue</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    


    const tbody = table.querySelector("tbody");

    function renderTable(data) {
        tbody.innerHTML = "";

        data.forEach(p => {
            const row = document.createElement("tr");

            const previsionCells = p.previsionStock.map(q => {
                let classe = "normal";
                if (q === 0) {
                    classe = "rupture";
                } else if (q <= 10) {
                    classe = "bientot-rupture";
                }
                return `<td class="${classe}">${q}</td>`;
            }).join("");

            row.innerHTML = `
                <td>${p.nomProduit}</td>
                <td>${p.stockActuel}</td>
                ${previsionCells}
                <td>${p.rupturePrevue || "aucune"}</td>
            `;

            const ruptures = data.filter(p => p.stockActuel === 0);

            if (ruptures.length > 0) {
            ruptureAlert.innerHTML = `
                <div class="rupture-box">
                ⚠️ <strong>${ruptures.length}</strong> produit(s) en rupture :
                <ul>${ruptures.map(p => `<li>${p.nomProduit}</li>`).join("")}</ul>
                </div>
            `;
            } else {
            ruptureAlert.innerHTML = ""; // rien si aucun produit en rupture
            }


            tbody.appendChild(row);
        });
    }

    renderTable(previsions);           // ✅ remplir le tableau au départ
    container.appendChild(table);      // ✅ ajouter le tableau au container principal
    return container;                  // ✅ retourner tout le contenu
}
