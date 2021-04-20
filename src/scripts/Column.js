import { App } from "./App.js";
import { getElementInLocalStorage, setElementInLocalStorage } from "./storageApi.js";
import { CreateNewCard } from "./Card.js";
export class Column extends App {
    constructor(columnData) {
        super();
        let {id, title, counter, columnClass, btnDeleteCard, btnCreateCard, todos} = columnData;
        Object.assign(this, {id, title, counter, columnClass, btnDeleteCard, btnCreateCard, todos});
        this.column = document.querySelector(this.id);
        this.data = columnData;
    }

    init() {
        this.column.insertAdjacentHTML("afterbegin", this.createColumn());
        this.updateColumnCounter();
        this.printCards();
    }

    updateColumnCounter() {
        this.column.querySelector(".kanban__column-count").innerText = this.todos.length;
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
        let column = this.data.find((item) => item.id === this.getColumnId(element));
        column.todos.length = 0
        setElementInLocalStorage(this.data, 'todos');
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
        let settingModal = cardChildren.find((child) =>
        child.classList.contains("visible")
        );

        if (settingModal) {
        settingModal.classList.toggle("visible");
        }
    }

    showCardSettings(element) {

        let cardItem = [...element.closest(".kanban__card").children];
        
        if (!cardItem.find((item) => item.classList.contains("kanban__card-setting")) &&
            this.getColumnId(element) !== '#inProgress') {
            element.parentNode.insertAdjacentHTML("beforeend", this.createCardSettingsModal());
        } else {
            element.parentNode.insertAdjacentHTML("beforeend", this.createCardSettingsModalInProgressColumn());
        }
        document.querySelector(".kanban__card-setting").classList.toggle("visible");
    }

    closeCard(element) {
        this.openCard(element);
    }

    addNewCard(titleText, cardTextInput, cardAuthor) {
        let cardId = `${this.data[0].todos.length + 1}`;
        let date = `${new Date().toLocaleDateString()} 
                    ${new Date().toLocaleTimeString().slice(0, -3)}`;
        let newCard = new CreateNewCard(titleText, cardTextInput, cardAuthor, date, cardId);
        this.data[0].todos.push(newCard);
        setElementInLocalStorage(this.data, "todos");
        location.reload();
    }

    getCardIndex(element){
        let cardIndex = element.closest(".kanban__card").id-1;
        console.log(cardIndex);
        return cardIndex;
    }

    getColumnId(element){
        let columnId = `${"#"}${element.closest(".kanban__column").id}`;
        return columnId;
    }

    removeCard(element) { 
        let column = this.data.find((item) => item.id === this.getColumnId(element));
        column.todos.splice(this.getCardIndex(element), 1);
        for (const card of column.todos) {
            card.id = `${column.todos.indexOf(card) + 1}`;
        }
        setElementInLocalStorage(this.data, "todos");
        location.reload();
    }

}