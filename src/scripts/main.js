import { Column } from './Column.js';
import { App } from './App.js';
import { getUserData } from './serviceApi.js';
import{ getElementInLocalStorage, setElementInLocalStorage} from "./storageApi.js";

new App().init();
getUserData();

let column = new Column(getElementInLocalStorage('todos'));

document.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('kanban__modal-btn--add')){
        let modal = document.querySelector(".kanban__modal");
        let title = modal.querySelector("input").value;
        let comment = modal.querySelector("textarea").value;
        let author = modal.querySelector(".kanban__modal-list").value;
        column.addNewCard(title, comment, author);
    }

    if (e.target.classList.contains('kanban__column-add-elements') ||
        e.target.classList.contains("kanban__modal-btn--cancel")) {
        column.useModal(document.querySelector('.kanban__modal'));
    } 

    if (e.target.classList.contains('kanban__column-delete-cards')) {
        column.removeAllCard(e.target);
    }

    if (e.target.closest(".kanban__card")) {
        if (
            !e.target.classList.contains("kanban__card-btn--next") &&
            !e.target.classList.contains("kanban__card-btn--setting") &&
            !e.target.classList.contains("kanban__card-item--edit") &&
            !e.target.classList.contains("kanban__card-setting") &&
            !e.target.classList.contains("kanban__card-edit") &&
            !e.target.classList.contains("kanban__card-edit--button") &&
            !e.target.classList.contains("kanban__card-edit--name") &&
            !e.target.classList.contains("kanban__card-edit--comment") &&
            !e.target.classList.contains("kanban__card-edit--buttons")
        ) {
            column.openCard(e.target);
        }
    }
});