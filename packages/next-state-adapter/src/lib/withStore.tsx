'use client';

import React, {ComponentType, forwardRef, JSX} from "react";
import {useStore} from "./store";
import {useInitialRender} from "./useInitialRender";

/**
 * A higher-order component (HOC) that injects the store into a component and runs a callback function on the initial render.
 *
 * @template Component - The type of the component being wrapped.
 * @template Store - The type of the store passed from the context.
 *
 * @param {Component} Component - The component to wrap.
 * @param {Function} cb - A callback function that will be called with the store and component's props.
 *
 * @returns {JSX.Element} A new component with the store injected.
 *
 * @example
 * ~/store/config.ts
 * import {withStore as withStoreHoc} from 'next-state-adapter';
 * ...
 * export const withStore = withStoreHoc.withTypes<MyStoreType>()
 *
 * ~/MyComponent.tsx
 * const MyComponent = observer((props: { initialTodos: Todos[] }) => {
 *      const store = useAppStore()
 *
 *     return (
 *         <div>{store.todos.todoList.map(...)}</div>
 *     )
 * });
 *
 * export const MyComponentWithStore = withStore(MyComponent, (store, props) => {
 *   // You can use the store and props here
 *   console.log(store.todos.todoList, props.initialTodos);
 *   store.todos.init(props.initialTodos)
 * });
 *
 * ~/app/todos.tsx
 * const Component = async () => {
 *     const initialTodos = await fetchTodos()
 *     return (
 *      <MyComponentWithStore initialTodos={initialTodos} />
 *     )
 * };
 */

export const withStore = <Props,Store = unknown>(Component: ComponentType<Props & {store: Store}>, cb: (store: Store, args: Props) => void) => {
    const WrappedComponent = forwardRef((props: unknown, ref) => {
        const store = useStore() as Store;
        useInitialRender(() => cb(store, props as Props));

        if(!ref){
            // @ts-ignore
            return <Component {...props} store={store}/>;
        }

        // @ts-ignore
        return <Component {...props} ref={ref} store={store}/>;
    });

    WrappedComponent.displayName = 'WrappedComponent'

    return WrappedComponent as unknown as ((props: Omit<Props, 'store'>) => JSX.Element);
}

withStore.withTypes = <Store,>() => {
    // @ts-ignore
    return <Props,>(Component: ComponentType<Props>, cb: (store: Store, args: Props) => void) => withStore<Props, Store>(Component, cb)
}
