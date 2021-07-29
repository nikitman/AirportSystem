import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";
import { flightsStore } from "../../../stores/flightsStore";
import { observer } from "mobx-react";
import { airportsStore } from "../../../stores/airportsStore";
import { FlightLayer } from "./FlightLayer";
import { AirportLayer } from "./AirportLayer";

@observer
export class LeafletMap extends React.Component {
    render() {
        const airport = airportsStore.selectedAirport;
        const flight = flightsStore.selectedFlight;

        if (!airport) {
            return null;
        }

        return (
            <MapContainer center={[airport.latitude, airport.longitude]} zoom={1} style={{ height: 500 }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {flight ? <FlightLayer flight={flight} /> : <AirportLayer airport={airport} />}
            </MapContainer>
        )
    }
}