export async function getStockPrevision() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          idProduit: 1,
          nomProduit: "Lait demi-écrémé",
          stockActuel: 50,
          previsionStock: [45, 40, 35, 30, 25, 20, 15],
          rupturePrevue: "aucune",
          categorie: "Alimentation"
        },
        {
          idProduit: 2,
          nomProduit: "Bananes bio",
          stockActuel: 100,
          previsionStock: [90, 80, 70, 60, 50, 40, 30],
          rupturePrevue: "aucune",
          categorie: "Alimentation"
        },
        {
          idProduit: 3,
          nomProduit: "Shampooing doux",
          stockActuel: 0,
          previsionStock: [1, 0, 0, 0, 0, 0, 0],
          rupturePrevue: "J+2",
          categorie: "Hygiène et beauté"
        },
        {
          idProduit: 4,
          nomProduit: "Moichoirs en papier",
          stockActuel: 0,
          previsionStock: [0, 0, 0, 0, 10, 9, 8],
          rupturePrevue: "J+1",
          categorie: "Hygiène et beauté"
        },
        {
          idProduit: 5,
          nomProduit: "Liquide vaisselle",
          stockActuel: 23,
          previsionStock: [20, 15, 10, 5, 2, 0, 0],
          rupturePrevue: "J+6",
          categorie: "Entretien et maison"
        },
        {
          idProduit: 5,
          nomProduit: "Couche pampers",
          stockActuel: 25,
          previsionStock: [20, 15, 10, 5, 2, 0, 0],
          rupturePrevue: "J+6",
          categorie: "Bébé et puériculture"
        },
        {
          idProduit: 6,
          nomProduit: "Cahiers clairefontaine 24x32",
          stockActuel: 15,
          previsionStock: [10, 5, 0, 0, 0, 0, 0],
          rupturePrevue: "J+3",
          categorie: "Papeterie et fournitures"
        },
        {
          idProduit: 7,
          nomProduit: "Téléviseur 4K Samsung",
          stockActuel: 60,
          previsionStock: [55, 50, 45, 40, 35, 30, 25],
          rupturePrevue: "aucune",
          categorie: "Electroménager et multimédia"
        },
        {
          idProduit: 8,
          nomProduit: "Croquettes pour chien",
          stockActuel: 0,
          previsionStock: [0, 0, 0, 0, 105, 90, 85],
          rupturePrevue: "J+1",
          categorie: "Animaux"
        },
        {
          idProduit: 5,
          nomProduit: "Croquettes pour chat",
          stockActuel: 25,
          previsionStock: [20, 15, 10, 5, 2, 0, 0],
          rupturePrevue: "J+6",
          categorie: "Animaux"
        },
        {
          idProduit: 9,
          nomProduit: "Ballon de foot",
          stockActuel: 78,
          previsionStock: [75, 70, 65, 60, 55, 50, 45],
          rupturePrevue: "aucune",
          categorie: "Jeux, jouets et loisirs"
        },
        {
          idProduit: 9,
          nomProduit: "Set de jeux de société",
          stockActuel: 100,
          previsionStock: [100, 90, 65, 60, 58, 53, 37],
          rupturePrevue: "aucune",
          categorie: "Jeux, jouets et loisirs"
        },
        {
          idProduit: 10,
          nomProduit: "Gants de jardinage",
          stockActuel: 30,
          previsionStock: [25, 20, 15, 10, 5, 0, 0],
          rupturePrevue: "J+6",
          categorie: "Bricolage et jardin"
        }
      ]);
    }, 500);
  });
}
