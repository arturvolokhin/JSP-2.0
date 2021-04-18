export const getUserData = () => {
    return fetch ("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            return response.json();
        })
        .then((usersList) => {
            let person = [];
            usersList.forEach((user) => person.push(user.name));
                return person;
        })
        .then(person => {
            for (let i = 0; i < person.length; i++) {
                let option = new Option(person[i], `${person[i]}`);
                document.querySelector(".kanban__modal-list").append(option);
        }
        })
        .catch(console.log);
};

