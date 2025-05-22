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
        return data? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const getLists = async (idUser) => {
    try {
        const response = await fetch(`${BASEURL}/listes/utilisateur/${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        const data = await response.json();
        console.log("data", data);
        return data? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};

export const addList = async (idUser, nameList) => {
    try {
        const response = await fetch(`${BASEURL}/listes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nomL: nameList, idUtiliateur: idUser }),
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};  



export const addProductToList = async (idList, idProduit, quantity) => {
    try {
        const response = await fetch(`${BASEURL}/listes/${idList}/produits/${idProduit}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantite: quantity }),
        });
        if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
        
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};
