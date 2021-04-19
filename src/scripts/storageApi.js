import { data } from './data.js';

export function setElementInLocalStorage(element, name) {
    localStorage.setItem(name, JSON.stringify(element));
}

export function getElementInLocalStorage(element) {
    if (localStorage.todos == null) {
        setElementInLocalStorage(data, 'todos');
    } 
    return  JSON.parse(localStorage.getItem(element));
}  