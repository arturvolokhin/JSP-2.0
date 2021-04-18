import { data } from './data.js';

export function setElementInLocalStorage(element, name) {
    localStorage.setItem(name, JSON.stringify(element));
}

export function getElementInLocalStorage(element) {
    
    if (localStorage.length === 0) {
        
        setElementInLocalStorage(data, 'todos');
        return data;
    } else {
        return  JSON.parse(localStorage.getItem(element));
    }
    
}  