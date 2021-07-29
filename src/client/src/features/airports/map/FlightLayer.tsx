import { Typography } from "@material-ui/core";
import { MapConsumer, Marker, Popup } from "react-leaflet";
import React from "react";
import { Flight } from "../../../models/Flight";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { PolylineDecorator } from "./PolylineDecorator";

export class FlightLayer extends React.Component<{ flight: Flight }>  {
    render() {
        const flight = this.props.flight;

        const positions: LatLngExpression[] = [
            [flight.departureAirportLatitude, flight.departureAirportLongitude],
            [flight.arrivalAirportLatitude, flight.arrivalAirportLongitude],
        ];

        const arrow = [
            {
                offset: "100%",
                repeat: 0,
                symbol: L.Symbol.arrowHead({
                    pixelSize: 30,
                    polygon: false,
                    pathOptions: { stroke: true }
                })
            }
        ];

        return (
            <>
                <Marker position={positions[0]}>
                    <Popup>
                        <Typography variant="body2" component="span">
                            {flight.departureAirportName}
                        </Typography>
                    </Popup>
                </Marker>
                <Marker position={positions[1]}>
                    <Popup>
                        <Typography variant="body2" component="span">
                            {flight.arrivalAirportName}
                        </Typography>
                    </Popup>
                </Marker>
                <PolylineDecorator positions={positions} patterns={arrow} />
            </>
        )
    }
}