import {useStore} from "./store";
import {useInitialRender} from "./useInitialRender";

/**
 * Hook for hydrating the client store with server data.
 * Calls `syncFn` on the initial render to synchronize server-side data with the store state.
 *
 * @template AppStore - The type of the store state.
 * @param { (store: AppStore) => void } syncFn - A synchronization function that receives the current store state and updates it with server data.
 * @returns { AppStore } - The current store state.
 *
 * @example
 * const state = useStoreHydration((store) => {
 *   store.setData(serverData);
 * });
 */
export const useStoreHydration = <AppStore>(syncFn: (store: AppStore) => void ) => {
    const state = useStore() as AppStore

    useInitialRender(() => syncFn(state))

    return state
}

useStoreHydration.withTypes = <AppStore>() => {
    return useStoreHydration<AppStore>
}