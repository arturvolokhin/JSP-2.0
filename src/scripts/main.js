import { Column } from './Column.js';
import { App } from './App.js';
import{ getElementInLocalStorage, setElementInLocalStorage} from "./storageApi.js";

new App().init();

let column = new Column(getElementInLocalStorage('todos'));

document.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('kanban__column-add-elements')) {
        column.toggleModal(document.querySelector('.modal'));
    }

    if (e.target.classList.contains('kanban__column-delete-cards')) {
        column.removeAllCard(e.target);
    }

    if (e.target.closest(".kanban__card")) {
        if (!e.target.closest(".kanban__card").classList.contains('card-active') && 
            !e.target.classList.contains("kanban__card-button--next")){
                column.openCard(e.target.closest(".kanban__card"));
        } 
    }

    if (e.target.closest('.kanban__card-button--setting')) {
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

    if (e.target.classList.contains("kanban__card-button--next")) {
        column.transferCardAnotherColumn(e.target);
    }    

    if (e.target.classList.contains("kanban__card-edit--submit")) {
       column.editCard(e.target);
    }

    if (e.target.id === 'button-cancel') {
        column.toggleVisibleElement(document.querySelector('#modalRemoveAllCards'));
        column.darkenBackground();
    }

    if (e.target.id === 'button-accept') {
        column.removeAllCard(document.querySelector('.kanban__column--progress'));
        column.toggleVisibleElement(document.querySelector('#modalRemoveAllCards'));
        column.darkenBackground();
    }

    if (e.target.id === 'button-consent') {
        document.querySelector('#modalMaxCards').classList.toggle('visible');
        column.darkenBackground();
    }

});

document.querySelector('.modal').addEventListener('click', (e) => {
    
    if (e.target.classList.contains('modal__button-accept')){
        column.addNewCard(e.target);
        column.clearModalInput();
        column.toggleModal(document.querySelector('.modal'));
    }

    if (e.target.classList.contains("modal__button-cancel")) {
        column.toggleModal(document.querySelector('.modal'));
    } 

});