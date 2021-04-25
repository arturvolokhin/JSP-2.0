import { Column } from "./Column.js";
import { getElementInLocalStorage, setElementInLocalStorage } from "./storageApi.js";
import { getUserData } from './serviceApi.js';
export class App {
  constructor() {}
  
  createColumn() {
        return `<div class="kanban__column-head">
                    <p class="kanban__column-count">${this.counter}</p>
                    <h2 class="kanban__column-title">${this.title}</h2>
                    <div class="kanban__column-icons">
                        <div class="${this.btnDeleteCard}"></div>
                        <div class="${this.btnCreateCard}"></div>
                    </div>
                </div>
                <div class="kanban__body">
                </div>`;
  }

  createCard(card) {
        return `<div class="kanban__card" id = "${card.id}">
                    <p class="kanban__card-name">${card.title}</p>
                    <p class="kanban__card-comment">${card.comment}</p>
                    <div class="kanban__card-button kanban__card-button--setting"></div>
                    <div class="kanban__card-button kanban__card-button--next visible"></div>
                    <div class="kanban__card-footer">
                        <p class="kanban__card-date">${card.date}</p>
                        <p class="kanban__card-user">${card.author}</p>
                    </div>
                    <div class="kanban__card-close"></div>
                </div>`;
  }

  createCardSettingsModal() {
        return `<ul class="kanban__card-setting check">
                    <li class="kanban__card-item  kanban__card-item--edit">Изменить комментарий и название заметки</li>
                    <li class="kanban__card-item  kanban__card-item--delete">Удалить заметку</li>
                </ul>`;
  }

  createCardSettingsModalWithoutEdit() {
        return `<ul class="kanban__card-setting check">
                    <li class="kanban__card-item  kanban__card-item--delete">Удалить заметку</li>
                </ul>`;
  }

  createEditCardModal() {
        return `<ul class="kanban__card-edit check" >
                    <input type="text" class="kanban__card-edit--name" placeholder="Изменить название заметки">
                    <textarea class="kanban__card-edit--comment" placeholder="Изменить комментарий заметки"></textarea>
                    <div class="kanban__card-edit--buttons">
                        <button class="kanban__card-edit--button  kanban__card-edit--submit">Сохранить</button>
                        <button class="kanban__card-edit--button  kanban__card-edit--cancel">Отменить</button>
                    </div>
                </ul>`;
  }

  init() {
    getUserData();
    this.todosData = getElementInLocalStorage("todos");
    this.todosData.forEach((col) => new Column(col).init());
  }
}
