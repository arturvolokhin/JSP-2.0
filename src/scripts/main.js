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
});