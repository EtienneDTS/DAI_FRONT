import { loginUser } from "../api";

export const loginPage = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "login-page";

    wrapper.innerHTML = `
      <h2>Connexion</h2>
      <form class="login-form">
        <span class="errorMsg"></span>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="ex: jean@drive.fr" required />
  
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="••••••" required />
  
        <button type="submit">Se connecter</button>
      </form>
    `;

    const form = wrapper.querySelector(".login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        try {
            const userData = await loginUser(email, password);
            console.log("Connecté :", userData);

            localStorage.setItem("user", JSON.stringify(userData));
            console.log(localStorage, "localStorage");
            window.location.href = "/";
        } catch (err) {
            const errorMsg = document.querySelector(".errorMsg");
            errorMsg.textContent = "Échec de la connexion.";
            errorMsg.style.display = "block";
        }
        console.log("Tentative de connexion :", email, password);
    });

    return wrapper;
};
