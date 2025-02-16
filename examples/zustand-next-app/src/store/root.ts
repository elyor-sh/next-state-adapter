import {createTodoStore} from "@/todos/model";

export const createRootStore = () => {
    return {
        todos: createTodoStore()
    }
}

export type RootStore = ReturnType<typeof createRootStore>