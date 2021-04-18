import { Column } from './Column.js';
import { App } from './App.js';
import { getUserData } from './serviceApi.js';
import{ getElementInLocalStorage, setElementInLocalStorage} from "./storageApi.js";

new App().init();
getUserData();

let column = new Column(getElementInLocalStorage('todos'));

document.addEventListener('click', (e) => {
    
});