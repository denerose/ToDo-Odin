"use strict";

// src/todo.ts
var Tasks;
((Tasks2) => {
  const people = [{ name: "Me" }];
  let lastKey = 0;
  class ToDoItem {
    constructor(props) {
      this.title = props.title;
      this.description = props.description;
      this.status = props.status;
      this.assignedPerson = props.assignedPerson;
      this.key = lastKey + 1;
      lastKey++;
    }
    changeStatus() {
      this.status = !this.status;
    }
  }
  Tasks2.ToDoItem = ToDoItem;
  let testTasks = [
    new ToDoItem({
      title: "test task",
      description: "a description can go here",
      status: true,
      assignedPerson: { name: "Me" }
    }),
    new ToDoItem({
      title: "test task 2",
      description: "a description can go here",
      status: false,
      assignedPerson: { name: "You" }
    })
  ];
  let allTasks = testTasks;
  function getTaskList() {
    return allTasks;
  }
  Tasks2.getTaskList = getTaskList;
  function newToDoItem(input) {
    let newTask = new ToDoItem(input);
    getTaskList().push(newTask);
  }
  Tasks2.newToDoItem = newToDoItem;
  function removeToDoItem(keyToRemove) {
    let filtered = allTasks.filter(function(value) {
      return value.key !== keyToRemove;
    });
    allTasks = filtered;
  }
  Tasks2.removeToDoItem = removeToDoItem;
})(Tasks || (Tasks = {}));

// src/display.ts
var DisplayControl;
((DisplayControl2) => {
  const app = document.getElementById("app");
  function refreshTaskDisplay() {
    app.innerHTML = "";
    const taskList = Tasks.getTaskList();
    taskList.forEach((task) => {
      const newCard = document.createElement("div");
      const newTitle = document.createElement("h2");
      if (!task.status)
        newCard.className = "taskCard";
      if (task.status)
        newCard.className = "compTaskCard";
      newCard.id = String(task.key);
      newTitle.innerText = task.title;
      newTitle.className = "taskHeader";
      newCard.appendChild(newTitle);
      const taskBtnDiv = document.createElement("div");
      const deleteBtn = document.createElement("img");
      deleteBtn.src = "trash.svg";
      deleteBtn.className = "deleteBtn";
      deleteBtn.onclick = function() {
        Tasks.removeToDoItem(task.key);
        refreshTaskDisplay();
      };
      taskBtnDiv.appendChild(deleteBtn);
      const checkBtn = document.createElement("img");
      checkBtn.src = "check-circle.svg";
      checkBtn.className = "checkBtn";
      checkBtn.onclick = function() {
        task.changeStatus();
        refreshTaskDisplay();
      };
      taskBtnDiv.appendChild(checkBtn);
      newCard.appendChild(taskBtnDiv);
      app.appendChild(newCard);
    });
  }
  DisplayControl2.refreshTaskDisplay = refreshTaskDisplay;
  function addEventListeners() {
    const taskBtn = document.getElementById("newTaskBtn");
    const roomBtn = document.getElementById("newRoomBtn");
    const cancelBtn = document.getElementById("cancelModalBtn");
    const newTaskModal = document.getElementById("newTaskModal");
    taskBtn.onclick = function() {
      newTaskModal.style.display = "block";
    };
    cancelBtn.onclick = function() {
      newTaskModal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == newTaskModal) {
        newTaskModal.style.display = "none";
      }
    };
    const newTaskForm = document.getElementById("newTaskForm");
    newTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(newTaskForm);
      Tasks.newToDoItem({
        title: String(formData.get("title")),
        description: String(formData.get("desc")),
        assignedPerson: { name: String(formData.get("assignPerson")) },
        status: false
      });
      newTaskForm.reset();
      newTaskModal.style.display = "none";
      refreshTaskDisplay();
    });
  }
  DisplayControl2.addEventListeners = addEventListeners;
})(DisplayControl || (DisplayControl = {}));

// src/index.ts
function main() {
  DisplayControl.refreshTaskDisplay();
  DisplayControl.addEventListeners();
}
main();
