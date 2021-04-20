import { App } from "./App.js";
import {
  getElementInLocalStorage,
  setElementInLocalStorage,
} from "./storageApi.js";
import { CreateNewCard } from "./Card.js";

export class Column extends App {
  constructor(columnData) {
    super();
    let {
      id,
      title,
      counter,
      columnClass,
      btnDeleteCard,
      btnCreateCard,
      todos,
    } = columnData;
    Object.assign(this, {
      id,
      title,
      counter,
      columnClass,
      btnDeleteCard,
      btnCreateCard,
      todos,
    });
    this.column = document.querySelector(this.id);
    this.data = columnData;
  }

  init() {
    this.deleteOldHtmlElement(this.column);
    this.column.insertAdjacentHTML("afterbegin", this.createColumn());
    this.updateColumnCounter();
    this.printCards();
  }

  updateColumnCounter() {
    this.column.querySelector(
      ".kanban__column-count"
    ).innerText = this.todos.length;
  }

  printCards() {
    this.todos.forEach((card) => {
      this.column
        .querySelector(".kanban__body")
        .insertAdjacentHTML("afterbegin", this.createCard(card));
    });
  }

  toggleVisibleElement(item) {
    item.classList.toggle("visible");
  }

  toggleUnvisibleElement(...item) {
    item.forEach((element) => element.classList.toggle("unvisible"));
  }

  toggleDarknessElement(item) {
    item.classList.toggle("darkness");
  }

  useModal(element) {
    this.toggleVisibleElement(element);
    this.toggleDarknessElement(document.querySelector(".wrap"));
  }

  openCard(card) {
    card.classList.toggle("card-active");
    this.toggleUnvisibleElement(
      card.querySelector(".kanban__card-comment"),
      card.querySelector(".kanban__card-btn--setting"),
      card.querySelector(".kanban__card-btn--next"),
      card.querySelector(".kanban__card-user"),
      card.querySelector(".kanban__card-close")
    );
    this.toggleDarknessElement(document.querySelector(".wrap"));
  }

  closeCard(card) {
    let settingsModal = [...card.children].find((child) =>
      child.classList.contains("visible")
    );
    this.openCard(card);
    settingsModal ? settingsModal.classList.toggle("visible") : true;
  }

  showCardSettings(element) {
    let cardItem = [...element.closest(".kanban__card").children];
    let checkSettings = cardItem.find((item) =>
      item.classList.contains("kanban__card-setting")
    );

    if (!checkSettings && this.getColumnId(element) !== "#inProgress") {
      element.parentNode.insertAdjacentHTML(
        "beforeend",
        this.createCardSettingsModal()
      );
    } else if (!checkSettings && this.getColumnId(element) == "#inProgress") {
      element.parentNode.insertAdjacentHTML(
        "beforeend",
        this.createCardSettingsModalInProgressColumn()
      );
    }
    element.parentNode
      .querySelector(".kanban__card-setting")
      .classList.toggle("visible");
  }

  showEditCardModal(element) {
    let cardChildren = [...element.closest(".kanban__card").children];

    if (
      !cardChildren.find((item) => item.classList.contains("kanban__card-edit"))
    ) {
      element
        .closest(".kanban__card")
        .insertAdjacentHTML("afterbegin", this.createEditCardModal());
    }
    element.closest(".kanban__card-setting").classList.toggle("visible");
    element
      .closest(".kanban__card")
      .querySelector(".kanban__card-edit")
      .classList.toggle("visible");
  }

  addNewCard(titleText, cardTextInput, cardAuthor) {
    let cardId = `${this.data[0].todos.length + 1}`;
    let date = `${new Date().toLocaleDateString()} 
            ${new Date().toLocaleTimeString().slice(0, -3)}`;
    let newCard = new CreateNewCard(
      titleText,
      cardTextInput,
      cardAuthor,
      date,
      cardId
    );
    this.data[0].todos.push(newCard);
    setElementInLocalStorage(this.data, "todos");
    new App().init();
  }

  getCardIndex(element) {
    let cardIndex = element.closest(".kanban__card").id - 1;
    return cardIndex;
  }

  getColumnId(element) {
    let columnId = `${"#"}${element.closest(".kanban__column").id}`;
    return columnId;
  }

  removeCard(element) {
    let column = this.data.find(
      (item) => item.id === this.getColumnId(element)
    );
    column.todos.splice(this.getCardIndex(element), 1);
    for (const card of column.todos) {
      card.id = `${column.todos.indexOf(card) + 1}`;
    }
    setElementInLocalStorage(this.data, "todos");
    this.toggleDarknessElement(document.querySelector('.wrap')) 
    new App().init();
  }

  removeAllCard(element) {
    let column = this.data.find(
      (item) => item.id === this.getColumnId(element)
    );
    column.todos.length = 0;
    setElementInLocalStorage(this.data, "todos");
    new App().init();
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
    let column = this.data.find(
      (item) => item.id === this.getColumnId(element)
    );
    let newColumn = this.data.find((item) => item.id === newColumnId);
    column.todos[this.getCardIndex(element)].id = `${
      newColumn.todos.length + 1
    }`;
    newColumn.todos.push(column.todos[this.getCardIndex(element)]);
    column.todos.splice(this.getCardIndex(element), 1);
    for (const card of column.todos) {
      card.id = `${column.todos.indexOf(card) + 1}`;
    }
    setElementInLocalStorage(this.data, "todos");
    new App().init();
  }
  deleteOldHtmlElement(column) {
    while (column.firstChild) {
      column.removeChild(column.lastChild);
    }
  }
  clearModalInput(){
    document.querySelector('.kanban__modal-name').value = ''
    document.querySelector('.kanban__modal-comment').value = ''
}
editCard(element){
  let column =  this.data.find(
        (item) => item.id === this.getColumnId(element)
      );
    column.todos[this.getCardIndex(element)].title = element.offsetParent.querySelector('input').value
    column.todos[this.getCardIndex(element)].comment = element.offsetParent.querySelector('textarea').value
    setElementInLocalStorage(this.data, "todos");
    this.toggleVisibleElement(element.closest('.kanban__card-edit'))
    this.toggleDarknessElement(document.querySelector('.wrap')) 
    new App().init();
}
}