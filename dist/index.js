"use strict";

// src/todo.ts
var Tasks;
((Tasks2) => {
  const people = [{ name: "Me" }];
  class ToDoItem {
    constructor(props) {
      this.title = props.title;
      this.description = props.description;
      this.status = props.status;
      this.assignedPerson = props.assignedPerson;
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
  const loungeRoom = testTasks;
  function getRoom() {
    return loungeRoom;
  }
  Tasks2.getRoom = getRoom;
})(Tasks || (Tasks = {}));

// src/display.ts
var DisplayControl;
((DisplayControl2) => {
  const app = document.getElementById("app");
  function addTasksToDOM() {
    Tasks.getRoom().forEach((task) => {
      const newCard = document.createElement("div");
      const newTitle = document.createElement("H2");
      newCard.className = "taskCard";
      newTitle.innerText = task.title;
      newCard.appendChild(newTitle);
      app.appendChild(newCard);
    });
  }
  DisplayControl2.addTasksToDOM = addTasksToDOM;
})(DisplayControl || (DisplayControl = {}));

// src/index.ts
function main() {
  DisplayControl.addTasksToDOM();
}
main();
