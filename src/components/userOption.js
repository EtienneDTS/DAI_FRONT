export const userOption = (user) => {
    const wrapper = document.createElement("div");
    wrapper.className = "user-menu";

    wrapper.innerHTML = `
      <div class="user-info">
        <strong>${user.nom}</strong> (${user.role})
      </div>
      <ul class="user-actions">
        <li><button class="logout">Déconnexion</button></li>
      </ul>
    `;

    wrapper.querySelector(".logout").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    });

    return wrapper;
};
