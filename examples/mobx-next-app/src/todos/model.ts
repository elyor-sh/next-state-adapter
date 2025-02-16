import {makeAutoObservable} from "mobx";

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
}

export class TodoModel {

    todos: Todo[] = []

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    init (todos: Todo[]) {
        this.todos = todos
    }

    create (title: string) {
        this.todos.push({
            id: (Math.random() * 100).toString(36),
            title,
            completed: false
        })
    }

    complete (id: string) {
        const t = this.todos.find(todo => todo.id === id)
        if(t){
            t.completed = !t.completed
        }
    }

    remove (id: string) {
        this.todos = this.todos.filter(t => t.id !== id)
    }
}