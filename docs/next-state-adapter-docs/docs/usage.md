---
title: "Usage"
sidebar_label: "Usage"
---

# Usage

This guide will help you integrate **next-state-adapter** into your Next.js App Router project.

## 1. Configure Root Store, Store Provider, Typed Hook, and HOC

First, create a root store configuration and set up the necessary hooks and provider.

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

// If you need class component support, create a HOC without 'use client'
// ~/store/withStore.ts
export const withStore = withStoreHoc.withTypes<RootStore>()
```

## 2. Wrap Your Components with StoreProvider

Ensure that your application is wrapped in `StoreProvider` inside the root layout.

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

## 3. Create a Component with Store and Hydrate with Server Data

Here’s an example using **MobX**, but you can use any state management library.

```tsx
// ~/todos/list.tsx
'use client';

const TodoList = observer(({initialTodos}: { initialTodos: Todo[] }) => {
    const {todos} = useAppStoreHydration((store) => {
        // Hydrate the client store with server data
        store.todos.init(initialTodos)
    })

    return (
        <ul>
            {todos.todos.map((todo) => (
                <li id={todo.id} key={todo.id}>
                    {todo.title}
                </li>
            ))}
        </ul>
    );
});

TodoList.displayName = 'Todos';
```

## 4. Use the Component in a Server Component

```tsx
// ~/app/todos/page.tsx
export default async function Todos () {
    const initialTodos = await fetchTodos(); // Fetch initial data on server side

    return <TodoList initialTodos={initialTodos} />;
}
```

## 5. Using Class Components

To use `next-state-adapter` with class components, use the `withStore` HOC:

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
        const users = store.users.users;

        return (
            <div>
                {users.map(user => <div key={user.id}>{user.id}</div>)}
            </div>
        );
    }
}

// `withStore` will pass the store as props
export const UsersList = withStore(Users, (store, props) => {
    const {initialUsers} = props;
    store.users.init(initialUsers);
});

// Server Component
export default async function UsersPage() {
    const initialUsers = await fetchUsers();
    return <UsersList initialUsers={initialUsers} />;
}
```

