import { getStockPrevision } from "../apis/getStokPrevision";
import { stockDashboard } from "./stockDashboard";
import { getUserAgeStats } from "../api.js";
import { getProducts } from "../api.js";
import { fetchAllCatalogProducts } from "../api";

import { getCategories } from "../api";






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
  uploadLabel.textContent = "Ajouter un produit (JSON)";
  uploadLabel.appendChild(fileInput);

  fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);

    const champsRequis = [
      "nomP", "prixUnitaireP", "prixKgP", "poidsP",
      "nutriP", "conditionnementP", "bioP", "marqueP", "urlImage", "idR", "idCate","idPr"
    ];

    const validerProduit = (prod, index = null) => {
      const manquants = champsRequis.filter(champ => !(champ in prod));
      if (manquants.length > 0) {
        const position = index !== null ? ` (produit #${index + 1})` : "";
        throw new Error(`Champs manquants${position} : ${manquants.join(", ")}`);
      }
    };

    let successCount = 0;
    let erreurs = [];

    // Cas tableau de produits
    if (Array.isArray(parsed)) {
      for (let i = 0; i < parsed.length; i++) {
        const prod = parsed[i];

        try {
          validerProduit(prod, i);

          const blob = new Blob([JSON.stringify(prod)], { type: "application/json" });
          const formData = new FormData();
          formData.append("file", blob, `produit-${i + 1}.json`);

          const response = await fetch("http://localhost:8081/api/produits/upload-json", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            erreurs.push(` Produit ${i + 1} : ${errorText}`);
          } else {
            const produitCree = await response.json();
            successCount++;
            console.log(` Produit ${i + 1} ajouté : ${produitCree.nomP}`);
          }

        } catch (err) {
          erreurs.push(` Produit ${i + 1} invalide : ${err.message}`);
        }
      }

      // Affichage du résumé
      const total = parsed.length;
      const erreurText = erreurs.length
        ? "\n\nDétails des erreurs :\n" + erreurs.join("\n")
        : "";

      alert(` ${successCount}/${total} produit(s) ajoutés avec succès.${erreurText}`);
    }

    // Cas 1 seul produit
    else if (typeof parsed === "object" && parsed.nomP) {
      try {
        validerProduit(parsed);

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
        alert(` Produit créé : ${produitCree.nomP}`);

      } catch (err) {
        alert(" Erreur : " + err.message);
      }
    }

    else {
      throw new Error("Format JSON non reconnu (objet ou tableau attendu)");
    }

  } catch (err) {
    alert("Erreur : " + err.message);
    console.error(err);
  }
});



  uploadBox.appendChild(uploadLabel);
  container.appendChild(uploadBox);

  // ===== 3. Prévisions de stock
  const previsions = await getStockPrevision();
  const stockSection = stockDashboard(previsions);
  container.appendChild(stockSection);

  
 //Restock des produits du magasin Borderouge:

 
function createRestockForm(produits) {
  const formContainer = document.createElement("div");
  formContainer.classList.add("restock-form");

  const title = document.createElement("h3");
  title.textContent = "Refaire le stock (Borderouge)   ";
  formContainer.appendChild(title);

  const form = document.createElement("form");

  const select = document.createElement("select");
  select.name = "produit";
  produits.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.nom} (${p.marque})`;
    select.appendChild(option);
  });

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = 1;
  qtyInput.placeholder = "Quantité à ajouter";
  qtyInput.required = true;

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Ajouter au stock";

  

  form.appendChild(select);
  form.appendChild(qtyInput);
  form.appendChild(submit);
  formContainer.appendChild(form);

  formContainer.style.display = "flex";
  formContainer.style.alignItems = "center";
  formContainer.style.gap = "5px";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const idProduit = select.value;
    const quantite = parseInt(qtyInput.value);

    const body = {
      idProduit: parseInt(idProduit),
      quantiteS: quantite
    };

    try {
      const res = await fetch("http://localhost:8081/api/restocker/6/stock/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const text = await res.text();
      alert(text);
    } catch (err) {
      console.error("Erreur ajout stock", err);
      alert("Une erreur est survenue");
    }
  });

  return formContainer;
}

const produitsCatalogue = await getProducts(); // ou ton API existante
const restockSection = createRestockForm(produitsCatalogue);
container.appendChild(restockSection);


// Arrivage nouveux produits

async function createFullRestockForm() {
  const container = document.createElement("div");
  container.classList.add("restock-form");

  const title = document.createElement("h3");
  title.textContent = "Ajouter un produit existant au stock";
  container.appendChild(title);

  // --- Sélecteur de catégories ---
  const selectCategorie = document.createElement("select");
  selectCategorie.innerHTML = `<option value="">-- Choisir une catégorie --</option>`;

  const categories = await getCategories(); // appel à /categories
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    selectCategorie.appendChild(option);
  });
  container.appendChild(selectCategorie);

  // --- Sélecteur de produits ---
  const selectProduit = document.createElement("select");
  selectProduit.innerHTML = `<option value="">-- Choisir un produit --</option>`;
  container.appendChild(selectProduit);

  // --- Champ quantité ---
  const inputQuantite = document.createElement("input");
  inputQuantite.type = "number";
  inputQuantite.placeholder = "Quantité à ajouter";
  inputQuantite.min = 1;
  container.appendChild(inputQuantite);

  // --- Bouton d'envoi ---
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Ajouter au stock";
  container.appendChild(submitBtn);

  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "15px";


  // --- Mise à jour des produits lors du changement de catégorie ---
  selectCategorie.addEventListener("change", async () => {
    const selectedCat = selectCategorie.value;
    const allProduits = await fetchAllCatalogProducts();

    const filtres = allProduits.filter(p => {
  console.log("Comparaison :", p.categorie, "==", selectedCat);
  return p.categorie === selectedCat;
  });


    selectProduit.innerHTML = `<option value="">-- Choisir un produit --</option>`;
    filtres.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.nom} (${p.marque})`;
      selectProduit.appendChild(opt);
    });
  });

  // --- Envoi vers le backend ---
  submitBtn.addEventListener("click", async () => {
    const idProduit = selectProduit.value;
    const quantite = parseInt(inputQuantite.value, 10);

    if (!idProduit || !quantite || quantite <= 0) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/api/restocker/6/stock/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idProduit: Number(idProduit), quantiteS: quantite }),
      });

      const text = await res.text();
      alert(text);
    } catch (e) {
      alert("Erreur lors de l'ajout du stock");
      console.error(e);
    }
  });



  return container;
}

const fullRestockForm = await createFullRestockForm();
container.appendChild(fullRestockForm);
  // ===== 4. Top ventes
  const topVentesBox = document.createElement("div");
  topVentesBox.classList.add("top-ventes");
  topVentesBox.innerHTML = `
    <h3>Produits les plus vendus</h3>
    <ul>
      ${topVentesMock.map(p => `<li>${p.nom} — ${p.quantite} ventes</li>`).join("")}
    </ul>
  `;
  container.appendChild(topVentesBox);

  // ===== 5. Profil client (chart)
  const chartSection = document.createElement("div");
  chartSection.classList.add("client-profile");
  chartSection.innerHTML = `
  <h3>Répartition des tranches d'âge</h3>
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