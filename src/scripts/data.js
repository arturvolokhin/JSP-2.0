export const data = [
    {
        id: "#todo",
        title: "Todo",
        counter: 0,
        btnDeleteCard: "kanban__column-delete-cards",
        btnCreateCard: "kanban__column-add-elements",
        todos: [
            {
                id: 1,
                title: "Создать кнопку",
                comment: "Очень большую большую кнопку!)",
                date: "21:30",
                autor: "Artur",
            },

            {
                id: 2,
                title: "Создать кнопку",
                comment: "Очень большую большую кнопку!)",
                date: "21:30",
                autor: "Artur",
            },
        ],
    },

    {
        id: "#inProgress",
        title: "In Progress",
        counter: 0,
        columnClass: "kanban__column kanban__column--progress",
        btnDeleteCard: "kanban__column-delete-cards",
        todos: [
            {
                id: 3,
                title: "Создать модалку",
                comment: "Очень большую большую модалку!)",
                date: "20:17",
                autor: "Anton",
            },
        ],
    },

    {
        id: "#done",
        title: "Done",
        counter: 0,
        columnClass: "kanban__column kanban__column--done",
        btnDeleteCard: "kanban__column-delete-cards",
        todos: [
            {
                id: 4,
                title: "Сделать зарядку",
                comment: "Ну хотя бы чуть-чуть))!)",
                date: "7:30",
                autor: "Artur",
            },
        ],
    },
];

// localStorage.setItem('todos', JSON.stringify(data));
