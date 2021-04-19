import {App} from './App.js';

export class Column extends App {
    constructor(columnData){
        super();
        let {id, title, counter, columnClass, btnDeleteCard, btnCreateCard, todos} = columnData;
        Object.assign(this, {id, title, counter, columnClass, btnDeleteCard, btnCreateCard, todos});
        this.column = document.querySelector(this.id);
    }
        
    init() {
            this.column.insertAdjacentHTML("afterbegin", this.createColumn());
            this.updateColumnCounter();
            this.printCards();   
    } 

    updateColumnCounter() {
        this.column.querySelector('.kanban__column-count').innerText = this.todos.length;
    }

    printCards() {
        this.todos.forEach((card) => {
            this.column.querySelector(".kanban__body").insertAdjacentHTML("afterbegin", this.createCard(card));
        });
    }

    toggleVisibleElement(item) {
        item.classList.toggle("visible");
    }

    toggleUnvisibleElement(item) {
        item.classList.toggle("unvisible");
    }

    toggleDarknessElement(item) {
        item.classList.toggle("darkness");
    }

    useModal(element) {
        this.toggleVisibleElement(element);
        this.toggleDarknessElement(document.querySelector(".wrap"));
    }

    removeAllCard(element) {
        let columns = JSON.parse(localStorage.getItem('todos'));
    
        columns.forEach((column) => {
            if (column.id.slice(1) === element.closest('.kanban__column').id) {
                column.todos.length = 0;
            }
        });

        columns = JSON.stringify(columns);
        localStorage.setItem('todos', columns);
        location.reload();
    }

    openCard(element) {
        let card = element.closest(".kanban__card");
        card.classList.toggle("card-active");
        this.toggleUnvisibleElement(card.querySelector(".kanban__card-comment"));
        this.toggleUnvisibleElement(card.querySelector(".kanban__card-btn--setting"));
        this.toggleUnvisibleElement(card.querySelector(".kanban__card-btn--next"));
        this.toggleUnvisibleElement(card.querySelector(".kanban__card-user"));
        this.toggleUnvisibleElement(card.querySelector(".kanban__card-close"));
        this.toggleDarknessElement(document.querySelector(".wrap"));

        //Далее отрезаем возможность свернуть карточку с открытым модальным окном настроек.

        let cardChildren = [...card.children];
        let settingModal = cardChildren.find((child) => child.classList.contains("visible"));

        if (settingModal) {
            settingModal.classList.toggle("visible");
        }
    }

}