import {User} from "@/users/api";
import {makeAutoObservable} from "mobx";

export class UsersModel {

    users: User[]

    constructor() {
        this.users = []
        makeAutoObservable(this, {}, {autoBind: true})
    }

    init (users: User[]) {
        this.users = users
    }
}