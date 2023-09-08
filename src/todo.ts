export namespace Tasks {

    interface Person {
        name: string
    }

    const people: Person[] = [{ name: "Me" }]

    export interface ToDoItemProps {
        title: string;
        description?: string;
        status: boolean;
        assignedPerson?: Person;
    }

    let lastKey = 0

    export class ToDoItem {

        title: string;
        description?: string;
        status: boolean;
        assignedPerson?: Person;
        key: number

        constructor(props: ToDoItemProps) {
            this.title = props.title
            this.description = props.description
            this.status = props.status
            this.assignedPerson = props.assignedPerson
            this.key = lastKey + 1
            lastKey++
        }

        public changeStatus() {
            this.status = !this.status
        }

    }

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
        }),
    ]

    let allTasks: ToDoItem[] = testTasks

    export function getTaskList() {
        return (allTasks)
    }

    export function newToDoItem(input: ToDoItemProps) {
        let newTask = new ToDoItem(input)
        getTaskList().push(newTask)
    }

    export function removeToDoItem(keyToRemove: number) {
        let filtered = allTasks.filter(function(value){ 
            return value.key !== keyToRemove;
        });
        allTasks = filtered
    }
}