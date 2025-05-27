const BASEURL = "http://localhost:8081/api";

export const getProducts = async () => {
    try {
        const response = await fetch(`${BASEURL}/produits`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Erreur lors du fetch des produits :", err);
        return [];
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASEURL}/login`, {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, motDePasse: password }),
        });

        if (!response.ok) {
            throw new Error("Identifiants incorrects");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur de login :", err);
        throw err;
    }
};

export const getOneProduct = async (id) => {
    try {
        const response = await fetch(`${BASEURL}/produits/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const getLists = async (idUser) => {
    try {
        const response = await fetch(
            `${BASEURL}/listes/utilisateur/${idUser}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const addList = async (idUser, nameList) => {
    console.log(idUser, nameList);
    try {
        const response = await fetch(`${BASEURL}/listes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                noml: nameList,
                idUtilisateur: parseInt(idUser),
            }),
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const addProductToList = async (idList, idProduit, quantity) => {
    try {
        const response = await fetch(
            `${BASEURL}/listes/${idList}/produits/${idProduit}?quantite=${quantity}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantite: quantity }),
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const deleteList = async (idList) => {
    console.log(idList, "idList");
    try {
        const response = await fetch(`${BASEURL}/listes/${idList}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const deleteProductFromList = async (idList, idProduit) => {
    try {
        const response = await fetch(
            `${BASEURL}/listes/${idList}/produits/${idProduit}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const modifyList = async (idList, idProduct) => {
    try {
        const response = await fetch(
            `${BASEURL}/listes/${idList}/produit/${idProduct}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const getOneList = async (idList) => {
    try {
        const response = await fetch(`${BASEURL}/listes/${idList}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch des produits :", err);
        return [];
    }
};

export const createPostit = async (idList) => {
    try {
        const response = await fetch(`${BASEURL}/listes/${idList}/postits`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const modifyPostit = async (idPostit, text) => {
    try {
        const response = await fetch(`${BASEURL}/listes/postits/${idPostit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ texte: text }),
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const deletePostit = async (idPostit) => {
    try {
        const response = await fetch(`${BASEURL}/listes/postits/${idPostit}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du postit :", err);
        return [];
    }
};

export async function getCategories() {
    const response = await fetch("http://localhost:8081/categories");
    if (!response.ok) {
        throw new Error("Erreur de récupération des catégories");
    }
    return await response.json();
}

export const getCart = async (idUser, idShop) => {
    if (!idUser === undefined || idShop === undefined) return
    try {
        const response = await fetch(
            `${BASEURL}/panier/utilisateur/${idUser}/magasin/${idShop}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const modifyCartProduct = async (idCart, idProduct, quantity) => {
    try {
        const response = await fetch(`${BASEURL}/panier/modifier-quantite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idPanier: idCart,
                idProduit: idProduct,
                nouvelleQuantite: quantity,
            }),
        });

        if (!response.ok) {
            throw new Error("erreur lors de la modification du produit");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur de login :", err);
        throw err;
    }
};

export const deleteProductFromCart = async (idCart, idProduct) => {
    console.log(idCart, idProduct, "on est la ");
    try {
        const response = await fetch(
            `${BASEURL}/panier/supprimer-produit-entier`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idPanier: idCart,
                    idProduit: idProduct,
                }),
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du postit :", err);
        return [];
    }
};

export const addProductToCart = async (idUser, idProduit, quantity) => {
    try {
        const response = await fetch(`${BASEURL}/panier/ajouter-produit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUtilisateur: idUser,
                idProduit: idProduit,
                quantite: quantity,
            }),
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export async function getUserAgeStats() {
    const response = await fetch("http://localhost:8081/utilisateurs/ages", {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des stats d'âge");
    }

    return await response.json();
}

export async function fetchAllCatalogProducts() {
    const res = await fetch("http://localhost:8081/api/produits");
    return await res.json();
}

export async function fetchAllCategoryNames() {
    const res = await fetch("http://localhost:8081/categories");
    return await res.json();
}

export const deleteCart = async (idPanier) => {
    try {
        const response = await fetch(`${BASEURL}/panier/${idPanier}/vider`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du postit :", err);
        return [];
    }
};

export const transfertListToCart = async (idUser, idList) => {
    try {
        const response = await fetch(
            `${BASEURL}/listes/${idList}/deverser-dans-panier/${idUser}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("erreur lors de la modification du produit");
        }
    } catch (err) {
        console.error("Erreur de login :", err);
        throw err;
    }
};

export const getShops = async () => {
    try {
        const response = await fetch(`${BASEURL}/magasins`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Erreur lors du fetch des produits :", err);
        return [];
    }
};

export const modifyShop = async (idUser, newIdShop) => {
    try {
        const response = await fetch(
            `${BASEURL}/utilisateurs/${idUser}/magasin/${newIdShop}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const order = async (idCart, idDate, idSlot) => {
    try {
        const response = await fetch(
            `${BASEURL}/panier/${idCart}/passer-commande`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                    creneaux: slot,
                }),
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const startCommande = async (idCart) => {
    try {
        const response = await fetch(
            `${BASEURL}/panier/${idCart}/demarrer-preparation`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const endCommande = async (idCart) => {
    try {
        const response = await fetch(
            `${BASEURL}/panier/${idCart}/terminer-preparation`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const getOrders = async (idShop) => {
    
    try {
        const response = await fetch(
            `${BASEURL}/panier/magasin/${idShop}/commandes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        return data ? data : [];
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const getDeals = async () => {
    try {
        const response = await fetch(`${BASEURL}/promotions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("Erreur lors du fetch des produits :", err);
        return [];
    }
};

export const getSlot = async (idShop) => {
    try {
        
        const response = await fetch(`${BASEURL}/panier/disponibilites/${idShop}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        return data
    } catch (err) {
        console.error("Erreur lors du fetch des creneaux :", err);
        return [];
    }
};

export const loginUserA = async (idMagasin) => {
    try {
        const response = await fetch(`${BASEURL}/utilisateur-anonyme/${idMagasin}`, {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Identifiants incorrects");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur de login :", err);
        throw err;
    }
};

export const getRecommendedProducts = async (idUser) => {
    console.log(idUser, "idUser dans getRecommendedProducts");
    try {
        const response = await fetch(`http://localhost:8081/api/produits/recommandations/${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log(data, "datefssfa");
        return data
    } catch (err) {
        console.error("Erreur lors du fetch des produits :", err);
        return [];
    }
};