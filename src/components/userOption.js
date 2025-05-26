import { modifyShop } from "../api";

export const userOption = (user, shops = []) => {
    const wrapper = document.createElement("div");
    wrapper.className = "user-menu";

    wrapper.innerHTML = `
      <div class="user-info">
        <strong>${user.nom} ${user.prenom}</strong> (${user.role})
      </div>
      <ul class="user-actions">
        <li>
          <label for="storeSelect">Magasin :</label>
          <select id="storeSelect">
            ${shops
                .map(
                    (s) =>
                        `<option value="${s.id}" ${
                            s.id ==
                            JSON.parse(localStorage.getItem("user"))?.magasin
                                ?.id
                                ? "selected"
                                : ""
                        }>${s.nomM} à ${
                            Math.floor(Math.random() * 10) + 1
                        } km</option>`
                )
                .join("")}
          </select>
        </li>
        <li><button class="logout">Déconnexion</button></li>
      </ul>
    `;

    const storeSelect = wrapper.querySelector("#storeSelect");
    storeSelect?.addEventListener("change", async (e) => {
        const newShopId = e.target.value;
        const newUserInfo = await modifyShop(user.id, newShopId);
        localStorage.setItem("user", JSON.stringify(newUserInfo.utilisateur));
    });

    wrapper.querySelector(".logout").addEventListener("click", () => {
        localStorage.removeItem("user");
        location.href = "/";
    });

    return wrapper;
};
