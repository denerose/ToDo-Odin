"use strict";

// src/todo.ts
var Tasks;
((Tasks2) => {
  const people = [{ name: "Me" }];
  const categories = ["default", "Test"];
  let lastKey = 0;
  class ToDoItem {
    constructor(props) {
      this.title = props.title;
      this.description = props.description;
      this.status = props.status;
      this.assignedPerson = props.assignedPerson;
      this.key = lastKey + 1;
      lastKey++;
      this.category = props.category;
      this.dueDate = props.dueDate;
      if (this.title == "") {
        this.title = `Task #${this.key}`;
      }
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
  function getCats() {
    return categories;
  }
  Tasks2.getCats = getCats;
})(Tasks || (Tasks = {}));

// src/display.ts
var DisplayControl;
((DisplayControl2) => {
  const app = document.getElementById("app");
  let currentCategory = "default";
  function refreshTaskDisplay() {
    app.innerHTML = "";
    const taskList = Tasks.getTaskList();
    taskList.forEach((task) => {
      var _a;
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
      const newInfo = document.createElement("div");
      newInfo.className = "cardInfoDiv";
      const catDiv = document.createElement("div");
      catDiv.innerText = "Category: " + task.category;
      newInfo.appendChild(catDiv);
      const dueDiv = document.createElement("div");
      dueDiv.innerText = "Due: " + String(task.dueDate);
      newInfo.appendChild(dueDiv);
      const personDiv = document.createElement("div");
      personDiv.innerText = "User: " + String((_a = task.assignedPerson) == null ? void 0 : _a.name);
      newInfo.appendChild(personDiv);
      newCard.appendChild(newInfo);
      const taskBtnDiv = document.createElement("div");
      const deleteBtn = document.createElement("img");
      deleteBtn.src = "trash.svg";
      deleteBtn.className = "deleteBtn";
      deleteBtn.onclick = function() {
        Tasks.removeToDoItem(task.key);
        refreshTaskDisplay();
      };
      deleteBtn.title = "delete task";
      taskBtnDiv.appendChild(deleteBtn);
      const checkBtn = document.createElement("img");
      checkBtn.src = "check-circle.svg";
      checkBtn.className = "checkBtn";
      checkBtn.onclick = function() {
        task.changeStatus();
        refreshTaskDisplay();
      };
      checkBtn.title = "change task status";
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
    const newCatBtn = document.getElementById("newCatBtn");
    newCatBtn.addEventListener("click", () => {
      refreshCatButtons(Tasks.getCats());
    });
  }
  DisplayControl2.addEventListeners = addEventListeners;
  function addCatButton(cat) {
    const catDiv = document.getElementById("catDiv");
    const newCatBtn = document.createElement("button");
    newCatBtn.innerText = String(cat);
    catDiv.appendChild(newCatBtn);
  }
  function addCatOption(cat) {
    const newCatOpt = document.createElement("option");
    newCatOpt.value = cat;
    newCatOpt.innerText = cat;
    return newCatOpt;
  }
  function refreshCatButtons(array) {
    const catDiv = document.getElementById("catDiv");
    const catsDrop = document.getElementById("catsDrop");
    catDiv.innerHTML = "";
    catsDrop.innerHTML = "";
    array.forEach((cat) => {
      addCatButton(cat);
      catsDrop.appendChild(addCatOption(cat));
    });
  }
})(DisplayControl || (DisplayControl = {}));

// src/index.ts
function main() {
  DisplayControl.refreshTaskDisplay();
  DisplayControl.addEventListeners();
}
main();
