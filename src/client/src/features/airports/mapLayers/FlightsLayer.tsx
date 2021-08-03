import { Typography } from "@material-ui/core";
import { LayerGroup, Marker, Popup } from "react-leaflet";
import React, { Fragment } from "react";
import { Flight } from "../../../models/Flight";
import { LatLngTuple } from "leaflet";
import { Line } from "../../map/Line";
import { observer } from "mobx-react";
import { Airport } from "../../../models/Airport";

@observer
export class FlightsLayer extends React.Component<{ airport: Airport, flights: Flight[] }> {
    render() {
        const { airport, flights } = this.props;

        return (
            <LayerGroup>
                {flights.map(flight => {
                    const positions: [LatLngTuple, LatLngTuple] = [
                        [flight.departureAirportLatitude, flight.departureAirportLongitude],
                        [flight.arrivalAirportLatitude, flight.arrivalAirportLongitude],
                    ];

                    const name = airport.id === flight.arrivalAirportId ? flight.departureAirportName : flight.arrivalAirportName;

                    return (
                        <Fragment key={flight.id}>
                            <Marker position={airport.id === flight.arrivalAirportId ? positions[0] : positions[1]}>
                                <Popup>
                                    <Typography variant="body2" component="span">
                                        {name}
                                    </Typography>
                                </Popup>
                            </Marker>
                            <Line positions={positions} pathOptions={{ stroke: true, color: `#${flight.color || "3f51b5"}` }} />
                        </Fragment>
                    );
                })}
            </LayerGroup>
        )
    }
}