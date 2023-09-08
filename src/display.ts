import { Tasks } from "./todo";

export module DisplayControl {

    const app = document.getElementById("app") as HTMLDivElement

    export function addTasksToDOM() {
        app.innerHTML = ""
        Tasks.getTaskList().forEach(task => {
            const newCard = document.createElement('div')
            const newTitle = document.createElement('H2')
            newCard.className = "taskCard"
            newTitle.innerText = task.title
            newCard.appendChild(newTitle)
            app.appendChild(newCard)
        });
    }

    export function addEventListeners() {
        const taskBtn = document.getElementById("newTaskBtn") as HTMLButtonElement
        const roomBtn = document.getElementById("newRoomBtn") as HTMLButtonElement
        const cancelBtn = document.getElementById("cancelModalBtn") as HTMLButtonElement
        const newTaskModal = document.getElementById("newTaskModal") as HTMLDivElement
        taskBtn.onclick = function () {
            newTaskModal.style.display = "block"
        }
        cancelBtn.onclick = function () {
            newTaskModal.style.display = "none"
        }
        window.onclick = function (event) {
            if (event.target == newTaskModal) {
                newTaskModal.style.display = "none";
            }
        }
        const newTaskForm = document.getElementById("newTaskForm") as HTMLFormElement
        newTaskForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(newTaskForm); 
            Tasks.newToDoItem({
                title: String(formData.get("title")),
                description: String(formData.get("desc")),
                assignedPerson: {name: String(formData.get("assignPerson"))},
                status: false,
            })
            newTaskForm.reset();
            newTaskModal.style.display = "none"
            addTasksToDOM();
        })
    }
}