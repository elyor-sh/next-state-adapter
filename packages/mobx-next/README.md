# mobx-next: mobx wrapper for Next.js App Router

**mobx-next** is mobx wrapper for **Next.js App Router**, enabling efficient and reactive state management in Server Components and Client Components.

## ✨ Features
- Works seamlessly with Next.js **App Router** (`app/` directory)
- Supports **initial data** placement in the **server-side store**
- Ensures **reactivity** and **performance optimizations**
- Simplifies **state hydration** and **server-side stores**

## 🚀 Quick Start

Install the package using npm or yarn:

```sh
npm install mobx-next
# or
yarn add mobx-next
```

## 📖 Usage

### 1. Configure root store, store provider, typed hook and withStore hoc

```tsx
// ~/store/config.ts
'use client';

import {RootStore} from "@/store/root";
import {createProvider, useStore, withStore as withStoreHoc} from "mobx-next";

const makeStore = () => {
    return new RootStore()
}

export const useAppStore = useStore.withTypes<RootStore>();

export const withStore = withStoreHoc.withTypes<RootStore>()

export const StoreProvider = createProvider(makeStore)

```

### 2. Wrap your components to StoreProvider

```tsx
// ~/app/layout.tsx

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
```

### 3. Create your component with store

```tsx
// ~/todos/list.tsx
'use client';

const Todos = observer(({}: { initialTodos: Todo[] }) => {
    const {todos} = useAppStore()

    return (
        <>
            <ul>
                {todos.todos.map((todo) => (
                    <li
                        id={todo.id}
                        key={todo.id}
                    >
                        {todo.title}
                    </li>
                ))}
            </ul>
        </>
    );
});

Todos.displayName = 'Todos';
```

### 4. Wrap your component to hoc withStore, set initial data to store

```tsx
// ~/todos/list.tsx
export const TodoList = withStore(Todos, (store, props) => {
    const {initialTodos} = props
    store.todos.init(initialTodos) // Initial todos from server
})
```

### 5. Use wrapped component on server component

```tsx
// ~/app/todos/page.tsx
export default async function Todos () {
    const initialTodos = await fetchTodos() // fetching initial data on server side.

    return (
        <>
            <TodoList initialTodos={initialTodos} />
        </>
    );
}
```
