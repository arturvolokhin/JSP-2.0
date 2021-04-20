import { Column } from "./Column.js";
import { getElementInLocalStorage, setElementInLocalStorage } from "./storageApi.js";
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
                  <p class="kanban__card-comment unvisible">${card.comment}</p>
                  <div class="kanban__card-btn kanban__card-btn--setting unvisible"></div>
                  <div class="kanban__card-btn kanban__card-btn--next"></div>
                  <div class="kanban__card-footer">
                      <p class="kanban__card-date">${card.date}</p>
                      <p class="kanban__card-user unvisible">${card.author}</p>
                  </div>
                  <div class="kanban__card-close unvisible"></div>
              </div>`;
  }

  createCardSettingsModal() {
      return `<ul class="kanban__card-setting">
                  <li class="kanban__card-item  kanban__card-item--edit">Изменить комментарий и название заметки</li>
                  <li class="kanban__card-item  kanban__card-item--delete">Удалить заметку</li>
              </ul>`;
  }

  createCardSettingsModalInProgressColumn() {
      return `<ul class="kanban__card-setting">
                  <li class="kanban__card-item  kanban__card-item--delete">Удалить заметку</li>
              </ul>`;
  }

  init() {
      this.todosData = getElementInLocalStorage("todos");
      this.todosData.forEach((col) => new Column(col).init());
  }
}
