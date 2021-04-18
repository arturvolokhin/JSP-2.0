import { Column } from "./Column.js";
import {getElementInLocalStorage, setElementInLocalStorage} from "./storageApi.js";

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

  init() {
    this.todosData = getElementInLocalStorage("todos");
    this.todosData.forEach((col) => new Column(col).init());
  }

}
