import { Column } from "./Column.js";
import { getElementInLocalStorage } from "./storageApi.js";
import { getUserData } from "./serviceApi.js";
export class App {
    constructor() {}

    createColumnContent() {
        return `<div class="kanban__column-head">
                    <p class="kanban__column-count">${this.counter}</p>
                    <h2 class="kanban__column-title">${this.title}</h2>
                    <div class="kanban__column-buttons">
                        <div class="kanban__column-delete-cards"></div>
                    </div>
                </div>
                <div class="kanban__body">
                </div>`;
    }

    createAddButton = () => {
        let todoColumn = document.querySelector(".kanban__column--todo");
        todoColumn
            .querySelector(".kanban__column-buttons")
            .insertAdjacentHTML(
                "afterbegin",
                '<div class="kanban__column-add-elements"></div>'
            );
    };

    createCard(card) {
        return `<div class="kanban__card" id = "${card.id}">
                    <p class="kanban__card-name">${card.title}</p>
                    <div class="kanban__card-button kanban__card-button--next"></div>
                    <div class="kanban__card-footer">
                        <p class="kanban__card-date">${card.date}</p>
                    </div>
                </div>`;
    }

    createActiveCard(card) {
        return `<div class="kanban__card-active" id = "${card.id}">
                    <p class="kanban__card-name">${card.title}</p>
                    <p class="kanban__card-comment">${card.comment}</p>
                    <div class="kanban__card-button kanban__card-button--setting"></div>
                    <div class="kanban__card-footer">
                        <p class="kanban__card-date">${card.date}</p>
                        <p class="kanban__card-user">${card.author}</p>
                    </div>
                    <div class="kanban__card-close"></div>
                </div>`;
    }

    createCardSettings() {
        return `<ul class="kanban__card-settings">
                    <li class="kanban__card-item  kanban__card-item--edit">
                        Изменить комментарий и название заметки
                    </li>
                    <li class="kanban__card-item  kanban__card-item--delete">
                        Удалить заметку
                    </li>
                </ul>`;
    }

    createCardSettingsModalWithoutEdit() {
        return `<ul class="kanban__card-setting">
                    <li class="kanban__card-item  kanban__card-item--delete">
                        Удалить заметку
                    </li>
                </ul>`;
    }

    createCardEdit(card) {
        return `<ul class="kanban__card-edit" >
                    <input type="text" value="${card.title}" 
                        class="kanban__card-edit--name" 
                        placeholder="Изменить название заметки">
                    <textarea class="kanban__card-edit--comment" 
                        placeholder="Изменить комментарий заметки">
                        ${card.comment}
                    </textarea>
                    <div class="kanban__card-edit--buttons">
                        <button class="kanban__card-edit--button  kanban__card-edit--submit">
                            Сохранить</button>
                        <button class="kanban__card-edit--button  kanban__card-edit--cancel">
                            Отменить</button>
                    </div>
                </ul>`;
    }

    createModal() {
        return `<form class="modal">
                    <h3 class="modal__title">Добавить новую заметку</h3>
                    <input class="modal__name" type="text" placeholder="Название заметки">
                    <textarea class="modal__comment" placeholder="Введите ваше сообщение"></textarea>
                    <div class="modal__dropdown">
                        <select class="modal__list"></select>
                    </div>
                    <div class="modal__buttons">
                        <button class="modal__button modal__button-submit">Добавить</button>
                        <button class="modal__button modal__button-cancel">Отмена</button>
                    </div>
                </form>`;
    }

    init() {
        getUserData();
        this.todosData = getElementInLocalStorage("todos");
        this.todosData.forEach((col) => new Column(col).init());
        this.createAddButton();
    }
}
