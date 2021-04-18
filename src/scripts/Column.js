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
            this.printCards();   
    } 

    printCards() {
        this.todos.forEach((card) => {
            this.column.querySelector(".kanban__body").insertAdjacentHTML("afterbegin", this.createCard(card));
        });
    }

    toggleVisibleElement(item) {
        item.classList.toggle("visible");
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

}