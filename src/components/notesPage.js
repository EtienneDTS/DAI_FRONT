import { getOneList, createPostit, modifyPostit, deletePostit } from "../api";

export const notesPage = async (idList) => {
    const wrapper = document.createElement("div");
    wrapper.className = "postit-page";

    const list = await getOneList(idList);
    let postits = list.postIts || [];

    const renderPostits = () => {
        const grid = wrapper.querySelector(".postit-grid");
        grid.innerHTML = "";

        postits.forEach((p) => {
            const card = document.createElement("div");
            card.className = "postit";
            card.dataset.id = p.id;

            const header = document.createElement("div");
            header.className = "postit-header";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.className = "postit-delete";
            deleteBtn.addEventListener("click", async () => {
                if (confirm("Voulez-vous supperimer cette note ?")) {
                    await deletePostit(p.id);
                    postits = postits.filter((pt) => pt.id !== p.id);
                    renderPostits();
                }
            });

            header.appendChild(deleteBtn);

            const textarea = document.createElement("textarea");
            textarea.className = "postit-textarea";
            textarea.placeholder = "Écrire une note...";
            textarea.value = p.texte || "";

            textarea.addEventListener("blur", async () => {
                await modifyPostit(p.id, textarea.value);
            });

            card.appendChild(header);
            card.appendChild(textarea);
            grid.appendChild(card);
        });
    };

    const render = () => {
        wrapper.innerHTML = `
      <div class="postit-header-bar">
        <h2>Notes pour la liste : <span>${list.noml}</span></h2>
        <button class="add-postit">Nouvelle note</button>
      </div>
      <div class="postit-grid"></div>
    `;

        wrapper
            .querySelector(".add-postit")
            .addEventListener("click", async () => {
                await createPostit(idList);
                const updated = await getOneList(idList);
                postits = updated.postIts || [];
                renderPostits();
            });

        renderPostits();
    };

    render();
    return wrapper;
};
