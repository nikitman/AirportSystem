import { Box, Card, CardContent, Grid, LinearProgress, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { airportsStore } from "../../stores/airportsStore";
import { flightsStore } from "../../stores/flightsStore";
import { FlightsList } from "./FlightsList";
import { LeafletMap } from "./map/LeafletMap";

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
            flightsStore.clearSelectedFlight();
        }

        render() {
            const airport = airportsStore.selectedAirport;

            if (airportsStore.isLoading || flightsStore.isLoading || !airport || !flightsStore.flights) {
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
                            <Grid item xs={6}>
                                <FlightsList flights={inboundFlights} title="Inbound Flights" />
                            </Grid>
                            <Grid item xs={6}>
                                <FlightsList flights={outboundFlights} title="Outbound Flights" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <LeafletMap />
                    </Grid>
                </Grid >
            );
        }
    }
));