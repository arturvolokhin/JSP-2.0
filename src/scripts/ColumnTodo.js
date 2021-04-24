import { Column } from "./Column.js";
import { CreateNewCard } from "./Card.js";
 export class ColumnTodo extends Column{
        constructor(){
            super(data)
             this.todos = columnData[0].todos
        }
        addNewCard(element) {
            let cardId = `${this.todos.length + 1}`;
            let date = `${new Date().toLocaleDateString()}${new Date().toLocaleTimeString().slice(0, -3)}`;
            let [titleText, cardTextInput, cardAuthor] = this.getModalInputsInfo(element)
            let newCard = new CreateNewCard(titleText, cardTextInput, cardAuthor, date, cardId);
            this.todos.push(newCard);
            setElementInLocalStorage(this.data, "todos");
            this.updateColumnCounter()
            this.printCards()
        }
    
}