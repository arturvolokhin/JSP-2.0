import { data } from './data.js';

export function setElementInLocalStorage(element, name) {
    localStorage.setItem(name, JSON.stringify(element));
}

export function getElementInLocalStorage(element) {
    
    if (localStorage.length === 0) {
        
        setElementInLocalStorage(cardData, 'todos');
        return cardData;
    }
    cardData = JSON.parse(localStorage.getItem(element));
    return cardData;
}  