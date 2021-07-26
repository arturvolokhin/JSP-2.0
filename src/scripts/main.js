import { Column } from "./Column.js";
import { App } from "./App.js";
import { getElementInLocalStorage } from "./storageApi.js";

new App().init();

let column = new Column(getElementInLocalStorage("todos"));

document.addEventListener("click", ({ target }) => {
    if (target.classList.contains("kanban__column-add-elements")) {
        column.openModal(target.closest(".kanban"));
    }

    if (target.classList.contains("kanban__column-delete-cards")) {
        column.removeAllCard(target.closest(".kanban__column").id);
    }

    if (target.closest(".kanban__card")) {
        !target.classList.contains("kanban__card-button--next") &&
            column.openCard(
                target.closest(".kanban__card"),
                target.closest(".kanban__column")
            );
    }

    if (target.closest(".kanban__card-close")) {
        column.closeCardSettings(target.closest(".kanban__card-active"));
    }

    if (target.closest(".kanban__card-button--setting")) {
        column.openCardSettings(target.closest(".kanban__card-active"));
    }

    if (target.classList.contains("kanban__card-item--edit")) {
        column.openCardEdit(
            target.closest(".kanban__card-active"),
            target.closest(".kanban__card-settings")
        );
    }

    if (target.closest(".kanban__card-item--delete")) {
        column.removeCard(
            target.closest(".kanban__card-active"),
            target.closest(".kanban__column").id
        );
    }

    if (target.classList.contains("kanban__card-edit--cancel")) {
        column.removeNode(target.closest(".kanban__card-edit"));
    }

    if (target.classList.contains("kanban__card-button--next")) {
        column.moveCardToNextColumn(
            target.closest(".kanban__card"),
            target.closest(".kanban__column")
        );
    }

    if (target.classList.contains("kanban__card-edit--submit")) {
        column.editCard(
            target.closest(".kanban__card-edit"),
            target.closest(".kanban__card-active")
        );
    }

    if (target.id === "button-cancel") {
        column.toggleVisibleElement(
            document.querySelector("#modalRemoveAllCards")
        );
        column.darkenBackground();
    }

    if (target.classList.contains("modal__button-cancel")) {
        column.removeNode(target.closest(".modal"));
    }
});

document.querySelector('.kanban').addEventListener('click', (e) => {
    if (e.target.classList.contains("modal__button-submit")) {
        e.preventDefault();
        const modal = e.target.closest(".modal");
        const title = modal.querySelector(".modal__name").value;
        const comment = modal.querySelector(".modal__comment").value;
        
        if (title.length > 5 && comment.length > 10) {
            column.createNewCard(modal, title, comment);
            column.removeNode(modal);
        } else {
            alert('Введите минимум 5 символов в названии и 10 в комментарии');
        }
    }
})
