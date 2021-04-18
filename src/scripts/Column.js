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

}