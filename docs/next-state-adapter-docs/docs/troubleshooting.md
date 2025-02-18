---
title: "Troubleshooting"
sidebar_label: "Troubleshooting"
---

# Troubleshooting

This guide helps resolve common issues when using `next-state-adapter`.

## Store is not available in components

### Issue
You are trying to access the store but get an `undefined` or `null` value.

### Solution
Make sure your component is wrapped in `StoreProvider`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    );
}
```

## State is not updating after hydration

### Issue
After fetching server-side data, the client store does not reflect the updates.

### Solution
Ensure you are using `useStoreHydration` correctly:

```tsx
const { todos } = useStoreHydration.withTypes<RootStore>()(store => {
    store.todos.init(initialTodos);
});
```

Also, verify that the fetched data is valid and structured correctly before hydration.

## `withStore` HOC does not pass the store to class components

### Issue
When using the `withStore` HOC, the store is not available in class components.

### Solution
Ensure that `withStore` is applied correctly:

```tsx
export const UsersList = withStore(Users, (store, props) => {
    store.users.init(props.initialUsers);
});
```
Also, confirm that the component is receiving `store` as a prop and using it properly.

## Hydration mismatch warning in Next.js

### Issue
You see a warning about hydration mismatch when rendering state-dependent components.

### Solution
Make sure that the initial state in the client matches the pre-rendered state from the server. This typically happens when data is fetched asynchronously but is not included in the initial render.

To fix this, ensure that server-fetched data is passed correctly as props and used for initial hydration.

## Store updates are not triggering re-renders

### Issue
Your components do not react to state changes.

### Solution
Check that your component is correctly consuming the store using `useStore` or `useStoreHydration`. If using MobX, ensure your component is wrapped with `observer`:

```tsx
const TodoList = observer(() => {
    const { todos } = useStore();
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
});
```

## Still having issues?
If you encounter persistent problems, check the official documentation, browse GitHub issues, or seek community support.

