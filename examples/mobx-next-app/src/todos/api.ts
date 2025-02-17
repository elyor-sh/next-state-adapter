import {toQueryString} from "@/shared/lib/toQueryString";

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    userId: number;
}

export type TodoQueryParams = {
    userId?: string;
}

export async function fetchTodos (query?: TodoQueryParams): Promise<Todo[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos${toQueryString(query)}`);

    if(!response.ok){
        return []
    }

    return response.json()
}