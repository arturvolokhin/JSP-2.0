import { App } from "./App.js";
import { getElementInLocalStorage, setElementInLocalStorage } from "./storageApi.js";


export class Column extends App {
    constructor(columnData) {
        super();
        let {id, title, counter, columnClass, btnDeleteCard, btnCreateCard, todos,} = columnData;
        Object.assign(this, {id, title, counter, columnClass, btnDeleteCard, btnCreateCard, todos,});
        this.column = document.querySelector(this.id);
        this.data = columnData;
    }

    init() {
        this.column.innerHTML = `<div class="kanban__column-head">
                                    <p class="kanban__column-count">${this.counter}</p>
                                    <h2 class="kanban__column-title">${this.title}</h2>
                                    <div class="kanban__column-icons">
                                        <div class="${this.btnDeleteCard}"></div>
                                        <div class="${this.btnCreateCard}"></div>
                                    </div>
                                </div>
                                <div class="kanban__body">
                                </div>`
        this.updateColumnCounter();
        this.printCards();
    }

    updateColumnCounter() {
        this.column.querySelector(".kanban__column-count").innerText = this.todos.length;
    }

    printCards() {
        this.todos.forEach((card) => {
            this.column.querySelector(".kanban__body").innerHTML = `<div class="kanban__card" id = "${card.id}">
                                                                        <p class="kanban__card-name">${card.title}</p>
                                                                        <p class="kanban__card-comment unvisible">${card.comment}</p>
                                                                        <div class="kanban__card-button kanban__card-button--setting unvisible"></div>
                                                                        <div class="kanban__card-button kanban__card-button--next"></div>
                                                                         <div class="kanban__card-footer">
                                                                            <p class="kanban__card-date">${card.date}</p>
                                                                            <p class="kanban__card-user unvisible">${card.author}</p>
                                                                        </div>
                                                                         <div class="kanban__card-close unvisible"></div>
                                                                    </div>`
        });
    }

    toggleVisibleElement(item) {
        item.classList.toggle("visible");
    }

    toggleUnvisibleElement(...item) {
        item.forEach((element) => element.classList.toggle("unvisible"));
    }

    darkenBackground() {
        document.querySelector(".wrap").classList.toggle('darkness');
    }

    openModal(element) {
        this.toggleVisibleElement(element);
        this.darkenBackground();
    }

    closeModal(element) {
        this.toggleVisibleElement(element);
        this.darkenBackground();
    }

    openCard(card) {
        card.classList.toggle("card-active");
        this.toggleUnvisibleElement(
            card.querySelector(".kanban__card-comment"),
            card.querySelector(".kanban__card-button--setting"),
            card.querySelector(".kanban__card-button--next"),
            card.querySelector(".kanban__card-user"),
            card.querySelector(".kanban__card-close")
        );
        this.darkenBackground();
    }

    closeCard(card) {
        let settingsModal = [...card.children].find((child) => child.classList.contains("visible"));
        this.openCard(card);
        settingsModal ? settingsModal.classList.toggle("visible") : true;
    }

    showCardSettings(element) {
        let cardItem = [...element.closest(".kanban__card").children];
        let checkSettings = cardItem.find((item) => item.classList.contains("kanban__card-setting"));

        if (!checkSettings && this.getColumnId(element) !== "#inProgress" &&
            this.getColumnId(element) !== "#done") {
            element.parentNode.insertAdjacentHTML("beforeend",
            this.createCardSettingsModal());
        } else if (!checkSettings && this.getColumnId(element) == "#done") {
            element.parentNode.insertAdjacentHTML("beforeend",
            this.createCardSettingsModalWithoutEdit());
        } else if (!checkSettings && this.getColumnId(element) == "#inProgress") {
            element.parentNode.insertAdjacentHTML("beforeend",
            this.createCardSettingsModalWithoutEdit());
        }
        element.parentNode.querySelector(".kanban__card-setting").classList.toggle("visible");
    }

    showEditCardModal(element) {
        let cardChildren = [...element.closest(".kanban__card").children];

        if (!cardChildren.find((item) => item.classList.contains("kanban__card-edit"))) {
            element.closest(".kanban__card").insertAdjacentHTML("afterbegin", this.createEditCardModal());
        }
        element.closest(".kanban__card-setting").classList.toggle("visible");
        element.closest(".kanban__card").querySelector(".kanban__card-edit").classList.toggle("visible");
    }

    getCardIndex(element) {
        let cardIndex = element.closest(".kanban__card").id - 1;
        return cardIndex;
    }

    getColumnId(element) {
        let columnId = `${"#"}${element.closest(".kanban__column").id}`;
        return columnId;
    }
    getModalInputsInfo(element){
        let titleText =  element.offsetParent.querySelector(".modal__name").value
        let cardTextInput = element.offsetParent.querySelector(".modal__comment").value
        let cardAuthor = element.offsetParent.querySelector(".modal__list").value
        return [titleText, cardTextInput, cardAuthor]
    }

    removeCard(element) {
        let column = this.data.find((item) => item.id === this.getColumnId(element));
        column.todos.splice(this.getCardIndex(element), 1);
        for (const card of column.todos) {
            card.id = `${column.todos.indexOf(card) + 1}`;
        }
        setElementInLocalStorage(this.data, "todos");
        this.darkenBackground();
        new App().init();
    }

    removeAllCard(element) {
        let column = this.data.find((item) => item.id === this.getColumnId(element));
        if (column.id === '#inProgress' && 
        !document.querySelector('#modalRemoveAllCards').classList.contains('visible')) {
            document.querySelector('#modalRemoveAllCards').classList.toggle('visible');
            this.darkenBackground();
        } else {
            column.todos.length = 0;
            setElementInLocalStorage(this.data, "todos");
            new App().init();
        }
    }

    transferCardAnotherColumn(element) {
        let newColumnId;
        switch (this.getColumnId(element)) {
        case "#todo":
            newColumnId = "#inProgress";
            break;
        case "#inProgress":
            newColumnId = "#done";
            break;
        case "#done":
            newColumnId = "#todo";
            break;
        }
        
        let column = this.data.find((item) => item.id === this.getColumnId(element));
        let newColumn = this.data.find((item) => item.id === newColumnId);
        column.todos[this.getCardIndex(element)].id = `${newColumn.todos.length + 1}`;
        
        if (newColumn.todos.length >= 6 && newColumn.id === '#inProgress') {
            document.querySelector('#modalMaxCards').classList.toggle('visible');
            this.darkenBackground();
            for (const card of column.todos) {
                card.id = `${column.todos.indexOf(card) + 1}`;
            }
        } else {
            if(newColumnId === '#todo'){
                column.todos[this.getCardIndex(element)].comment = ''
            }
            newColumn.todos.push(column.todos[this.getCardIndex(element)]);
            column.todos.splice(this.getCardIndex(element), 1);
            for (const card of column.todos) {
                card.id = `${column.todos.indexOf(card) + 1}`;
            }
            setElementInLocalStorage(this.data, "todos");
            new App().init();
        }
    }

    deleteOldHtmlElement(column) {
        while (column.firstChild) {
            column.removeChild(column.lastChild);
        }
    }

    clearModalInput(){
        document.querySelector('.modal__name').value = ''
        document.querySelector('.modal__comment').value = ''
    }

    editCard(element){
        let column =  this.data.find((item) => item.id === this.getColumnId(element));
        column.todos[this.getCardIndex(element)].title = element.offsetParent.querySelector('input').value
        column.todos[this.getCardIndex(element)].comment = element.offsetParent.querySelector('textarea').value
        setElementInLocalStorage(this.data, "todos");
        this.toggleVisibleElement(element.closest('.kanban__card-edit'))
        this.darkenBackground();
        new App().init();
    }
}