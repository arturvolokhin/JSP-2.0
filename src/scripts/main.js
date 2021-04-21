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
        column.clearModalInput()
        column.useModal(document.querySelector('.kanban__modal'));
    }

    if (e.target.classList.contains('kanban__column-add-elements') ||
        e.target.classList.contains("kanban__modal-btn--cancel")) {
        column.useModal(document.querySelector('.kanban__modal'));
        
    } 

    if (e.target.classList.contains('kanban__column-delete-cards')) {
        column.removeAllCard(e.target);
    }

    if (e.target.closest(".kanban__card")) {
        if (!e.target.closest(".kanban__card").classList.contains('card-active') && 
            !e.target.classList.contains("kanban__card-btn--next")){
                column.openCard(e.target.closest(".kanban__card"));
        } 
    }

    if (e.target.closest('.kanban__card-btn--setting')) {
        column.showCardSettings(e.target);
    }

    if (e.target.closest('.kanban__card-close')) {
        column.closeCard(e.target.closest(".kanban__card"));
    }

    if (e.target.closest('.kanban__card-item--delete')){
        column.removeCard(e.target);
    }

    if (e.target.classList.contains("kanban__card-item--edit")) {
        column.showEditCardModal(e.target);
    }

    if (e.target.classList.contains("kanban__card-edit--cancel")) {
        column.toggleVisibleElement(e.target.closest('.kanban__card-edit'));
    
    }
    if (e.target.classList.contains("kanban__card-btn--next")) {
        column.transferCardAnotherColumn(e.target)
    } if (e.target.classList.contains("kanban__card-edit--submit")) {
       column.editCard(e.target)
    }

});