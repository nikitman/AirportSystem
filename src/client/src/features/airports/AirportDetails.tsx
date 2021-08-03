import { Box, Card, CardContent, Grid, LinearProgress, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { airportsStore } from "../../stores/airportsStore";
import { flightsStore } from "../../stores/flightsStore";
import { MapControl } from "../map/MapControl";
import { FlightsTable } from "./FlightsTable";
import { AirportLayer } from "./mapLayers/AirportLayer";
import { FlightsLayer } from "./mapLayers/FlightsLayer";

type Props = RouteComponentProps<{ id?: string | undefined }>;
type State = { flightSelected: boolean };

export const AirportDetails = withRouter(observer(
    class AirportDetails extends React.Component<Props, State> {
        componentDidMount() {
            const id = parseInt(this.props.match.params.id || "");

            if (isNaN(id)) {
                this.props.history.push("/airports");
                return;
            }

            airportsStore.setSelectedAirport(id);
            flightsStore.loadFlights(id);
        }

        componentWillUnmount() {
            airportsStore.clearSelectedAirport();
            flightsStore.clearSelectedFlights();
        }

        render() {
            const airport = airportsStore.selectedAirport;

            if (airportsStore.isLoading || flightsStore.isLoading || !airport) {
                return (
                    <Box m={2}>
                        <Typography variant="h3" component="p" align="center" gutterBottom>
                            Loading
                        </Typography>
                        <LinearProgress />
                    </Box>
                );
            }

            const inboundFlights = flightsStore.flights.filter(x => x.arrivalAirportId === airport.id);
            const outboundFlights = flightsStore.flights.filter(x => x.departureAirportId === airport.id);

            return (
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Card style={{ overflow: "auto" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h1" gutterBottom>
                                            #{airport.id} - {airport.name}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Location: {airport.latitude}, {airport.longitude} - {airport.city}, {airport.country}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <FlightsTable direction="inbound" flights={inboundFlights} />
                            </Grid>
                            <Grid item xs={12}>
                                <FlightsTable direction="outbound" flights={outboundFlights} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <MapControl>
                            <AirportLayer airport={airport} />
                            {flightsStore.selectedFlights.length > 0 && (
                                <FlightsLayer airport={airport} flights={flightsStore.selectedFlights} />
                            )}
                        </MapControl>
                    </Grid>
                </Grid >
            );
        }
    }
));