import {Todo} from "@/todos/model";

export async function fetchTodos (): Promise<Todo[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    title: 'Todo 1',
                    completed: false
                },
                {
                    id: '2',
                    title: 'Todo 2',
                    completed: false
                },
                {
                    id: '3',
                    title: 'Todo 3',
                    completed: false
                },
            ])
        }, 200)
    })
}