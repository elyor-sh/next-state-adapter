'use client';

import React, {createContext, ReactNode, useContext, useRef} from "react";

const context = createContext<unknown>(null)

/**
 * Custom hook to access the store from context.
 *
 * @template AppStore - The type of the store
 *
 * @returns {AppStore} The store value
 *
 * @throws {Error} If the hook is used outside of a Provider.
 *
 * @example
 * ~/store/config.ts
 * export const useAppStore = useStore.withTypes<MyStoreType>();
 * ~/todos.tsx
 * const store = useAppStore()
 * console.log(store.someState);
 */

export const useStore = <AppStore,>() => {
    const contextValue = useContext(context)

    if(!contextValue){
        throw new Error('useStore must be used within a Provider')
    }

    return contextValue as AppStore
}

useStore.withTypes = <AppStore,>() => {
    return () => useStore<AppStore>()
}

export type ProviderProps<AppStore> = {
    store: AppStore
    children?: ReactNode
}

const Provider = <AppStore,>({store, children}: ProviderProps<AppStore>) => {
    return (
        <context.Provider value={store}>
            {children}
        </context.Provider>
    )
}

/**
 * A function to create a context provider for managing a store.
 *
 * @template AppStore - The type of the store that will be provided through the context.
 *
 * @param {() => AppStore} makeStore - A function that creates and returns the store instance.
 *
 * @returns {React.FC} A component that provides the store to its children via context.
 *
 * @example
 * // Define the store type
 * ~/store.rootStore.ts
 *
 * export class RootStore {...}
 *
 * ~/store.config.ts
 *
 * // Function to create the store instance
 * const makeStore = () => {
 *     return new RooStore()
 * };
 *
 * // Create a provider component
 * const StoreProvider = createProvider(makeStore);
 *
 * // Use the provider in your component tree
 * ~/app/layout.tsx
 * const App = () => (
 *   <StoreProvider>
 *     {children}
 *   </StoreProvider>
 * );
 */
export const createProvider = <AppStore,>(makeStore: () => AppStore) => {
    function StoreProvider ({children}: { children: ReactNode }) {
        const storeRef = useRef<AppStore | null>(null)
        if(!storeRef.current){
            storeRef.current = makeStore()
        }

        return (
            <Provider store={storeRef.current as AppStore}>
                {children}
            </Provider>
        )
    }

    StoreProvider.displayName = 'NextStateAdapterStoreProvider'

    return StoreProvider
}