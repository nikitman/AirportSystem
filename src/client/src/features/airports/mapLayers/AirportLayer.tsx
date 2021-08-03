import { Typography } from "@material-ui/core";
import { Marker, Popup } from "react-leaflet";
import React from "react";
import { Airport } from "../../../models/Airport";

export class AirportLayer extends React.Component<{ airport: Airport }> {
    render() {
        const airport = this.props.airport;

        return (
            <Marker position={[airport.latitude, airport.longitude]}>
                <Popup>
                    <div>
                        <Typography variant="body2" component="span">
                            {airport.name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {airport.latitude}, {airport.longitude} - {airport.city}, {airport.country}
                        </Typography>
                    </div>
                </Popup>
            </Marker>
        );
    }
}