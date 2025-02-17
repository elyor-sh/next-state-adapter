import {TodoModel} from "@/todos/model";
import {UsersModel} from "@/users";

export class RootStore {
    todos: TodoModel
    users: UsersModel
    // user: CurrentUserModel
    //...
    //...

    constructor() {
        this.todos = new TodoModel()
        this.users = new UsersModel()
    }
}