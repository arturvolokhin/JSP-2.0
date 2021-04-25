export const getUserData = () => {
    return fetch ("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((usersList) => {
            let person = [];
            usersList.forEach((user) => person.push(user.name));
            return person;
        })
        .then(person => {
            if (!document.querySelector(".modal__list").children.length) {
                for (let i = 0; i < person.length; i++) {
                    let option = new Option(person[i], `${person[i]}`);
                    document.querySelector(".modal__list").append(option);
                }
            }
        })
        .catch(alert);
};