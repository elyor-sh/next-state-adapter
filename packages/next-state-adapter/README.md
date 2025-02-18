# next-state-adapter: is a state management adapter for Next.js App Router

**next-state-adapter** is state management adapter for **Next.js App Router**, enabling efficient state management in Server Components and Client Components.

For more detailed documentation, visit the [official docs](https://next-state-adapter.vercel.app/docs/intro).

## ✨ Features
- Works seamlessly with Next.js **App Router** (`app/` directory)
- Supports **initial data** placement in the **server-side store**
- Ensures **reactivity** and **performance optimizations**
- Simplifies **state hydration** and **server-side stores**

## 🚀 Quick Start

Install the package using npm or yarn:

```sh
npm install next-state-adapter
# or
yarn add next-state-adapter
```

## 📖 Usage

### 1. Configure root store, store provider, typed hook and withStore hoc

```tsx
// ~/store/config.ts
'use client';

import {RootStore} from "@/store/root";
import {createProvider, useStore, withStore as withStoreHoc} from "next-state-adapter";

const makeStore = () => {
    return new RootStore()
}

export const useAppStore = useStore.withTypes<RootStore>();

// Hook for hydrating the client store with server data.
export const useAppStoreHydration = useStoreHydration.withTypes<RootStore>()

export const StoreProvider = createProvider(makeStore)

// if you need support class components, create HOC withStore (Don't write 'use client' in this file)
// ~/store/withStore.ts
export const withStore = withStoreHoc.withTypes<RootStore>()

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

### 3. Create your component with store, hydrate with server data (example with Mobx, you can use any).

```tsx
// ~/todos/list.tsx
'use client';

const TodoList = observer(({initialTodos}: { initialTodos: Todo[] }) => {
    const {todos} = useAppStoreHydration((store) => {
        // hydrate the client store with the server data
        store.todos.init(initialTodos)
    })

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

TodoList.displayName = 'Todos';
```

### 4. Use component on server component

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

### 5. Using class components

```tsx
type Props = {
    store: RootStore;
    initialUsers: User[];
}

class Users extends Component<Props, {}> {
    constructor(props) {
        super(props);
    }

    render () {
        const { store } = this.props;
        const users = store.users.users

        return (
            <div>
                {users.map(user => <div key={user.id}>{user.id}</div>)}
            </div>
        );
    }
}

// withStore will pass store to component as props
export const UsersList = withStore(Users, (store, props) => {
    const {initialUsers} = props
    store.users.init(initialUsers)
})

// server component
export default async function UsersPage() {
    const initialUsers = await fetchUsers()
    return (
        <UsersList initialUsers={initialUsers} />
    )
}
```
