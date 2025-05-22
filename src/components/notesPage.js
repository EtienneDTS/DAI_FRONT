import { getOneList, createPostit, modifyPostit, deletePostit } from "../api";

export const notesPage = async (idList) => {
    const wrapper = document.createElement("div");
    wrapper.className = "postit-page";

    const list = await getOneList(idList);
    let postits = list.postits || [];

    const renderPostits = () => {
        const grid = wrapper.querySelector(".postit-grid");
        grid.innerHTML = "";

        postits.forEach((p) => {
            const card = document.createElement("div");
            card.className = "postit";
            card.dataset.id = p.id;

            const textarea = document.createElement("textarea");
            textarea.className = "postit-textarea";
            textarea.value = p.texte || "";

            const actions = document.createElement("div");
            actions.className = "postit-actions";

            const saveBtn = document.createElement("button");
            saveBtn.innerHTML = "💾";

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "🗑️";

            const save = async () => {
                await modifyPostit(p.id, textarea.value);
                saveBtn.innerHTML = "✅";
                setTimeout(() => (saveBtn.innerHTML = "💾"), 1000);
            };

            saveBtn.addEventListener("click", save);
            textarea.addEventListener("blur", save);

            deleteBtn.addEventListener("click", async () => {
                const confirmDelete = confirm("Supprimer ce post-it ?");
                if (!confirmDelete) return;
                await deletePostit(p.id);
                postits = postits.filter((pt) => pt.id !== p.id);
                renderPostits();
            });

            actions.appendChild(saveBtn);
            actions.appendChild(deleteBtn);
            card.appendChild(textarea);
            card.appendChild(actions);
            grid.appendChild(card);
        });
    };

    const render = () => {
        wrapper.innerHTML = `
      <h2>📝 Notes pour la liste : <span>${list.noml}</span></h2>
      <div class="postit-controls">
        <button class="add-postit">➕ Ajouter un post-it</button>
      </div>
      <div class="postit-grid"></div>
    `;

        wrapper
            .querySelector(".add-postit")
            .addEventListener("click", async () => {
                await createPostit(idList);
                const updated = await getOneList(idList);
                postits = updated.postits || [];
                renderPostits();
            });

        renderPostits();
    };

    render();
    return wrapper;
};
