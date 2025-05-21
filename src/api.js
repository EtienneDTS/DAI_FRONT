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
        return Array.isArray(data) ? data : {};
    } catch (err) {
        console.error("Erreur lors du fetch du produit :", err);
        return [];
    }
};
