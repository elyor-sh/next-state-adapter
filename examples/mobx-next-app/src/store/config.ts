'use client';

import {RootStore} from "@/store/root";
import {
    createProvider,
    useStore,
    withStore as withStoreHoc
} from "next-state-adapter";

const makeStore = () => {
    return new RootStore()
}

export const useAppStore = useStore.withTypes<RootStore>();

export const withStore = withStoreHoc.withTypes<RootStore>()

export const StoreProvider = createProvider(makeStore)