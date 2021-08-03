import { createContext } from "react";
import { LineOptions } from "./LineOptions";

export interface MapOptions {
    line: LineOptions;
}

export const defaultOptions: MapOptions = {
    line: {
        curved: false,
        dashed: false,
        directed: false
    }
}

export const MapOptionsContext = createContext<MapOptions>(defaultOptions);