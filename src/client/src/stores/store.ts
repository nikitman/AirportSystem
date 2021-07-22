import { createContext, useContext } from "react";
import AirportsStore from "./airportsStore";

interface Store {
    airportsStore: AirportsStore;
}

export const store: Store = {
    airportsStore: new AirportsStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}