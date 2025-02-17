'use client';

import {RootStore} from "@/store/root";
import {
    createProvider,
    useStore, useStoreHydration,
} from "next-state-adapter";

const makeStore = () => {
    return new RootStore()
}

export const useAppStore = useStore.withTypes<RootStore>();

// Hook for hydrating the client store with server data.
export const useAppStoreHydration = useStoreHydration.withTypes<RootStore>()

export const StoreProvider = createProvider(makeStore)