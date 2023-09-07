import { Tasks } from "./todo";

export module DisplayControl {

    const app = document.getElementById("app") as HTMLDivElement

    export function addTasksToDOM() {
        Tasks.getRoom().forEach(task => {
            const newCard = document.createElement('div')
            const newTitle = document.createElement('H2')
            newCard.className = "taskCard"
            newTitle.innerText = task.title
            newCard.appendChild(newTitle)
            app.appendChild(newCard)
        });
    }
}