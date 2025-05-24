import { getStockPrevision } from "../apis/getStokPrevision";
import { stockDashboard } from "./stockDashboard";
import { getUserAgeStats } from "../api.js";


// Tu peux simuler d'autres données ici
const topVentesMock = [
  { nom: "Lait", quantite: 120 },
  { nom: "Bananes", quantite: 95 },
  { nom: "Pâtes", quantite: 87 }
];

const usersMock = {
  labels: ["18-25", "26-35", "36-45", "46-60", "60+"],
  data: [25, 40, 20, 10, 5]
};

export async function managerDashboard() {
  const container = document.createElement("div");
  container.classList.add("manager-dashboard");

  // ===== 1. En-tête
  const header = document.createElement("div");
  header.classList.add("dashboard-header");
  header.innerHTML = `
    <div class="dashboard-user">
      <img src="/person-fill-x.svg" alt="avatar" class="avatar">
      <div>
        <h2>Jean Dupont</h2>
        <p>Mon Supermarché</p>
      </div>
    </div>
  `;
  container.appendChild(header);

  // ===== 2. Bouton ajout de produit
  const uploadBox = document.createElement("div");
  uploadBox.classList.add("upload-box");

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";

  const uploadLabel = document.createElement("label");
  uploadLabel.classList.add("upload-button");
  uploadLabel.textContent = "➕ Ajouter un produit (JSON)";
  uploadLabel.appendChild(fileInput);

  fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);

    const champsRequis = [
      "nomP", "prixUnitaireP", "prixKgP", "poidsP",
      "nutriP", "conditionnementP", "bioP", "marqueP", "urlImage", "idR", "idCate"
    ];

    const validerProduit = (prod, index = null) => {
      const manquants = champsRequis.filter(champ => !(champ in prod));
      if (manquants.length > 0) {
        const position = index !== null ? ` (produit #${index + 1})` : "";
        throw new Error(`Champs manquants${position} : ${manquants.join(", ")}`);
      }
    };

    // Cas : un seul produit
    if (typeof parsed === "object" && parsed.nomP) {
      validerProduit(parsed);

      // ✅ Envoi au backend
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8081/api/produits/upload-json", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Erreur serveur : " + errorText);
      }

      const produitCree = await response.json();
      alert(`✅ Produit créé : ${produitCree.nomP}`);
    }

    else {
      throw new Error("Format JSON non reconnu (un seul produit attendu)");
    }

  } catch (err) {
    alert("❌ Erreur : " + err.message);
    console.error(err);
  }
});



  uploadBox.appendChild(uploadLabel);
  container.appendChild(uploadBox);

  // ===== 3. Prévisions de stock
  const previsions = await getStockPrevision();
  const stockSection = stockDashboard(previsions);
  container.appendChild(stockSection);

  // ===== 4. Top ventes
  const topVentesBox = document.createElement("div");
  topVentesBox.classList.add("top-ventes");
  topVentesBox.innerHTML = `
    <h3>🔝 Produits les plus vendus</h3>
    <ul>
      ${topVentesMock.map(p => `<li>${p.nom} — ${p.quantite} ventes</li>`).join("")}
    </ul>
  `;
  container.appendChild(topVentesBox);

  // ===== 5. Profil client (chart)
  const chartSection = document.createElement("div");
  chartSection.classList.add("client-profile");
  chartSection.innerHTML = `
  <h3>📊 Répartition des tranches d'âge</h3>
  <div class="chart-wrapper">
    <canvas id="ageChart"></canvas>
  </div>
  `;

  container.appendChild(chartSection);

  getUserAgeStats().then(data => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const ctx = document.getElementById("ageChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        label: "Répartition",
        data: values,
        backgroundColor: [
          "#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "right" },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.formattedValue || '';
              return `${label}: ${value} personnes`;
            }
          }
        }
      }
    }
  });
}).catch(err => {
  console.error("Erreur graphique :", err);
});

  return container; // ← Fin de managerDashboard
}