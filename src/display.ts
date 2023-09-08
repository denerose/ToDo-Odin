import { Tasks } from "./todo";

export module DisplayControl {

    const app = document.getElementById("app") as HTMLDivElement

    export function refreshTaskDisplay() {
        app.innerHTML = ""
        const taskList = Tasks.getTaskList()
        taskList.forEach(task => {
            const newCard = document.createElement('div')
            const newTitle = document.createElement('h2')
            if (!task.status) newCard.className = "taskCard"
            if (task.status) newCard.className = "compTaskCard"
            newCard.id = String(task.key)
            newTitle.innerText = task.title
            newTitle.className = "taskHeader"
            newCard.appendChild(newTitle)
            const taskBtnDiv = document.createElement('div')
            const deleteBtn = document.createElement('img')
            deleteBtn.src = "trash.svg"
            deleteBtn.className = "deleteBtn"
            deleteBtn.onclick = function (){
                Tasks.removeToDoItem(task.key)
                refreshTaskDisplay();
            }
            taskBtnDiv.appendChild(deleteBtn)
            const checkBtn = document.createElement('img')
            checkBtn.src = "check-circle.svg"
            checkBtn.className = "checkBtn"
            checkBtn.onclick = function () {
                task.changeStatus();
                refreshTaskDisplay();
            }
            taskBtnDiv.appendChild(checkBtn)
            newCard.appendChild(taskBtnDiv)
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
            refreshTaskDisplay();
        })
    }
}