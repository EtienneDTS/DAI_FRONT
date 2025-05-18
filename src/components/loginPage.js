export const loginPage = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "login-page";

    wrapper.innerHTML = `
      <h2>Connexion</h2>
      <form class="login-form">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="ex: jean@drive.fr" required />
  
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="••••••" required />
  
        <button type="submit">Se connecter</button>
      </form>
    `;

    const form = wrapper.querySelector(".login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        console.log("Tentative de connexion :", email, password);
    });

    return wrapper;
};
