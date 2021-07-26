import { setElementInLocalStorage } from "./storageApi";

export const getUserData = () => {
    return fetch ("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((usersList) => setElementInLocalStorage([...usersList], 'users'))
        .catch(alert);
};