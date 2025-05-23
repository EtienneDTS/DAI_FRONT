export async function getStockPrevision() {
  // simulation de délai réseau
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          idProduit: 1,
          nomProduit: "Lait demi-écrémé",
          stockActuel: 50,
          previsionStock: [45, 40, 35, 30, 25, 20, 15],
          rupturePrevue: "J+7"
        },
        {
          idProduit: 2,
          nomProduit: "Bananes bio",
          stockActuel: 100,
          previsionStock: [90, 80, 70, 60, 50, 40, 30],
          rupturePrevue: "aucune"
        },
        {
          idProduit: 3,
          nomProduit: "Yaourt nature",
          stockActuel: 10,
          previsionStock: [5, 0, 0, 0, 0, 0, 0],
          rupturePrevue: "J+2"
        },

        {
          idProduit: 4,
          nomProduit: "Moichoirs en papier",
          stockActuel: 0,
          previsionStock: [0, 0, 0, 0, 10, 9, 8],
          rupturePrevue: "J+2"
        }

      ]);
    }, 500);
  });
}