import { App } from "./App.js";
import { setElementInLocalStorage, getElementInLocalStorage } from "./storageApi.js";
import { CreateNewCard } from "./Card.js";
import { v4 as uuid } from "uuid";

export class Column extends App {
    constructor(columnData) {
        super();
        let { id, classes, title, counter, todos } = columnData;
        Object.assign(this, { id, classes, title, counter, todos });
        this.column = document.querySelector(`.${this.classes}`);
        this.data = columnData;
    }

    init() {
        this.column.innerHTML = this.createColumnContent();
        this.updateColumnCounter();
        this.printCards();
    }

    updateColumnCounter() {
        this.column.querySelector(".kanban__column-count").innerText =
            this.todos.length;
    }

    printCards() {
        this.todos.forEach((card) => {
            this.column
                .querySelector(".kanban__body")
                .insertAdjacentHTML("afterbegin", this.createCard(card));
        });
    }

    blurBackground() {
        document.querySelector(".wrap").classList.toggle("blur");
    }

    openModal(element) {
        element.insertAdjacentHTML("afterbegin", this.createModal());
        const users = getElementInLocalStorage('users');
        users.map(user => {
            element.querySelector('.modal__list').insertAdjacentHTML('afterbegin',
            `<option>${user.name}</option>`)
        })
        
    }

    openCard(card, column) {
        const cardData = this.data[column.id].todos.find(
            (item) => item.id == card.id
        );
        column.insertAdjacentHTML("beforeend", this.createActiveCard(cardData));
        this.blurBackground();
    }

    openCardSettings(card) {
        card.querySelector(".kanban__card-settings")
            ? this.removeNode(card.querySelector(".kanban__card-settings"))
            : card.insertAdjacentHTML("afterbegin", this.createCardSettings());
    }

    getColumnId(element) {
        return element.closest(".kanban__column").id;
    }

    getCardIndex(element, card) {
        return element.findIndex((todo) => todo.id === card.id);
    }

    removeNode(element) {
        element.remove();
    }

    closeCardSettings(card) {
        this.removeNode(card);
        this.blurBackground();
    }

    openCardEdit(card, settings) {
        const cardData = this.data[this.getColumnId(card)].todos.find(
            (todo) => todo.id === card.id
        );
        this.removeNode(settings);
        card.insertAdjacentHTML("afterbegin", this.createCardEdit(cardData));
    }

    editCard(editModal, card) {
        let column = this.data[this.getColumnId(card)];
        let index = this.getCardIndex(column.todos, card);
        column.todos[index].title = editModal.querySelector("input").value;
        column.todos[index].comment = editModal.querySelector("textarea").value;
        setElementInLocalStorage(this.data, "todos");
        this.removeNode(editModal);
        this.blurBackground();
        new App().init();
    }

    createNewCard(modal, title, comment) {
        const newCardData = {
            title: title,
            comment: comment,
            user: modal.querySelector(".modal__list").value,
            date: `${new Date().toLocaleDateString()} 
                    ${new Date().toLocaleTimeString().slice(0, -3)}`,
            id: uuid(),
        };
        this.data[0].todos.push(new CreateNewCard(newCardData));
        setElementInLocalStorage(this.data, "todos");
        new App().init();
    }

    removeCard(card, id) {
        const index = this.getCardIndex(this.data[id].todos, card);
        this.data[id].todos.splice(index, 1);
        setElementInLocalStorage(this.data, "todos");
        this.blurBackground();
        new App().init();
    }

    removeAllCard(id) {
        this.data[id].todos.length = 0;
        setElementInLocalStorage(this.data, "todos");
        new App().init();
    }

    moveCardToNextColumn(card, column) {
        let oldColumn = this.data[column.id];
        let newColumn = null;
        column.id === "2"
            ? (newColumn = this.data[0])
            : (newColumn = this.data[+column.id + 1]);
        const index = this.getCardIndex(oldColumn.todos, card)
        newColumn.todos.push(oldColumn.todos[index]);
        oldColumn.todos.splice(index, 1);
        setElementInLocalStorage(this.data, "todos");
        new App().init();
    }
}