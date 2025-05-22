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
    try {
        const response = await fetch(`${BASEURL}/listes/${idList}`, {
            method: "DELETE",
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
        const response = await fetch(`${BASEURL}/listes/${idList}/postit`, {
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
        const response = await fetch(`${BASEURL}/listes/${idPostit}/postit`, {
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
        const response = await fetch(`${BASEURL}/listes/${idPostit}`, {
            method: "DELETE",
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
