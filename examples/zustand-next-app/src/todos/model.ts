import { create as createZustand } from 'zustand';

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

interface TodoState {
    todos: Todo[];
    create: (title: string) => void;
    complete: (id: string) => void;
    remove: (id: string) => void;
}

export const createTodoStore = () => {
    const useTodosStore = createZustand<TodoState>((set) => ({
        todos: [],
        create: (title) => set((state) => ({
            todos: [...state.todos, { id: (Math.random() * 100).toString(36), title, completed: false }]
        })),
        complete: (id) => set((state) => ({
            todos: state.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        })),
        remove: (id) => set((state) => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }))
    }));

    const init = (initialTodos: Todo[]) => {
        const state = useTodosStore.getState()
        // mutate the state with the initial data, zustand does not immediately cause rerendering with new data
        state.todos = initialTodos
    }

    return {
        useTodosStore,
        init
    }
}
