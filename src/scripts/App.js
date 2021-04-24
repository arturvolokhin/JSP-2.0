import { Column } from "./Column.js";
import { getElementInLocalStorage, setElementInLocalStorage } from "./storageApi.js";
import { getUserData } from './serviceApi.js';
export class App {
  constructor() {}
  
  createColumn() {
      return ;
  }

  createCard(card) {
      return 
  }

  createCardSettingsModal() {
      return `<ul class="kanban__card-setting">
                  <li class="kanban__card-item  kanban__card-item--edit">Изменить комментарий и название заметки</li>
                  <li class="kanban__card-item  kanban__card-item--delete">Удалить заметку</li>
              </ul>`;
  }

  createCardSettingsModalWithoutEdit() {
      return `<ul class="kanban__card-setting">
                  <li class="kanban__card-item  kanban__card-item--delete">Удалить заметку</li>
              </ul>`;
  }

  createEditCardModal() {
    return `<ul class="kanban__card-edit">
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
