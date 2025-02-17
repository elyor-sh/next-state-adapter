import {withStore as withStoreHoc} from "next-state-adapter";
import {RootStore} from "@/store/root";

export const withStore = withStoreHoc.withTypes<RootStore>()