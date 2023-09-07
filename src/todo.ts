namespace Tasks {

interface Person {
    name: string
}

interface ToDoItemProps {
    title: string;
    description: string;
    status: boolean;
    assignedPerson: Person;
}

export class ToDoItem {

    title: string;
    description?: string;
    status: boolean;
    assignedPerson?: Person;

    constructor(props: ToDoItemProps) {
        this.title = props.title
        this.description = props.description
        this.status = props.status
        this.assignedPerson = props.assignedPerson
    }

    changeStatus() {
        this.status = !this.status
    }

}

export const loungeRoom: ToDoItem [] = []

export function getRoom() {
    return(loungeRoom)
}

}