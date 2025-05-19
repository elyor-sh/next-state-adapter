'use client';

import {useState} from "react";
import {observer} from "mobx-react-lite";
import {useAppStoreHydration} from "@/store/config";
import {Todo} from "@/todos/api";


export const TodoList = observer(({initialTodos}: { initialTodos: Todo[] }) => {

    const {todos} = useAppStoreHydration((store) => {
        store.todos.init(initialTodos)
    })

    const [text, setText] = useState('');

    const handleAddTodo = () => {
        if (text.trim()) {
            todos.create(text)
            setText('');
        }
    };

    return (
        <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="flex mb-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 p-2 border rounded-l-md"
                    placeholder="Add a new task..."
                />
                <button
                    onClick={handleAddTodo}
                    className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
            <ul>
                {todos.todos.map((todo) => (
                    <li
                        id={todo.id}
                        key={todo.id}
                        className="flex justify-between items-center p-2 border-b last:border-none"
                    >
                        <span
                            onClick={() => todos.complete(todo.id)}
                            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        >
                            {todo.title}
                        </span>
                        <button
                            onClick={() => todos.remove(todo.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
});

TodoList.displayName = 'TodoList'

