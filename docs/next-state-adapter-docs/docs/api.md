---
title: "API Reference"
sidebar_label: "API"
---

# API Reference

This document provides an overview of the API methods available in **next-state-adapter**.

## `createProvider`

Creates a store provider component that supplies the store to the component tree.

```tsx
import { createProvider } from "next-state-adapter";
const StoreProvider = createProvider(() => new RootStore());
```

## `useStore`

A typed hook to access the store instance in functional components.

```tsx
const {todos} = useStore();

// or with Typescript
const useAppStore = useStore.withTypes<RootStore>();
const { todos } = useAppStore();

// or
const {todos} = useStore<RootStore>();
```

## `useStoreHydration`

A typed hook to hydrate the client store with server-side data.

```tsx
const { todos } = useStoreHydration(store => {
    store.todos.init(initialTodos);
});

// or with Typescript
const useAppStoreHydration = useStoreHydration.withTypes<RootStore>();
const { todos } = useAppStoreHydration(store => {
    store.todos.init(initialTodos);
})
```

## `withStore`

A Higher-Order Component (HOC) to hydrate server data and pass the store to class components.

```tsx
import { withStore as withStoreHoc } from 'next-state-adapter';

export const withStore = withStoreHoc.withTypes<RootStore>();

const UsersList = withStore(Users, (store, props) => {
    store.users.init(props.initialUsers)
})
```

## Example Usage

### Wrapping Components with Store Provider

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    );
}
```

### Using Server Initial Data in a Functional Component

```tsx
import {useStoreHydration} from "./useStoreHydration";

const TodoList = ({initialTodos}) => {
    const {todos} = useStoreHydration((store) => {
        store.todos.init(initialTodos)
    });
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};
```

### Using State in a Functional Component

```tsx
const TodoList = () => {
    const { todos } = useStore();
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};
```

### Using Server Initial Data in a Class Component

```tsx
class Users extends Component {
    render() {
        const { users } = this.props.store;
        return (
            <div>
                {users.map(user => <div key={user.id}>{user.name}</div>)}
            </div>
        );
    }
}

export const UsersList = withStore(Users, (store, props) => {
    store.users.init(props.initialUsers)
});
```

