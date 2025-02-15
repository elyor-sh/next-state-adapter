import {TodoModel} from "@/todos/model";

export class RootStore {
    todos: TodoModel
    // user: CurrentUserModel
    //...
    //...

    constructor() {
        this.todos = new TodoModel()
    }
}