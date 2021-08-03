import { Component, ComponentType } from "react";
import { LeafletContext } from '@react-leaflet/core';
import { MapOptions, MapOptionsContext } from "./MapOptionsContext";
import { LeafletContextInterface } from "@react-leaflet/core";
import { Subtract } from "utility-types";

export interface InjectedContexts {
    leafletContext: LeafletContextInterface;
    mapOptions: MapOptions;
}

export function withMapContexts<P extends InjectedContexts>(WrappedComponent: ComponentType<P>) {
    return class extends Component<Subtract<P, InjectedContexts>> {
        render() {
            return (
                <LeafletContext.Consumer>
                    {leafletContext => (
                        <MapOptionsContext.Consumer>
                            {optionsContext => (
                                <WrappedComponent
                                    {...this.props as P}
                                    leafletContext={leafletContext}
                                    mapOptions={optionsContext}
                                />
                            )}
                        </MapOptionsContext.Consumer>
                    )}
                </LeafletContext.Consumer>
            );
        }
    }
}