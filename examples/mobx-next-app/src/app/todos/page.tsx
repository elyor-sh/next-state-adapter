import {fetchTodos, TodoList, TodoQueryParams} from "@/todos";
import Link from "next/link";

type Props = {
    searchParams: Promise<TodoQueryParams>
}

export default async function Todos ({ searchParams }: Props) {
    const queryParams = await searchParams
    const initialTodos = await fetchTodos(queryParams)

    return (
        <div className='mx-auto container h-full'>
            <div className="my-3">
                <Link
                    href='/'
                    className='inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors'
                >
                    {`<- Back`}
                </Link>
            </div>

            <h2 className="text-xl font-bold mb-3">Todo List</h2>
            <TodoList initialTodos={initialTodos}/>
        </div>
    );
}
