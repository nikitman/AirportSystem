import { Typography, Paper, List, ListItem, Box } from "@material-ui/core";
import { format } from "date-fns";
import { observer } from "mobx-react";
import React from "react";
import { Flight } from "../../models/Flight";
import { flightsStore } from "../../stores/flightsStore";

interface Props {
    flights: Flight[];
    title: string;
}

@observer
export class FlightsList extends React.Component<Props> {
    render() {
        return (
            <>
                <Typography variant="h6" component="h2" gutterBottom>
                    {this.props.title}
                </Typography>
                <Paper style={{ overflow: "auto" }}>
                    <List style={{ maxHeight: 450 }}>
                        {this.props.flights.map(x => (
                            <ListItem
                                key={x.id}
                                button
                                selected={x.id === flightsStore.selectedFlight?.id}
                                onClick={() => flightsStore.setSelectedFlight(x.id)}
                            >
                                <Box>
                                    <Typography variant="body1" gutterBottom>
                                        {x.departureAirportName} -{'>'} {x.arrivalAirportName}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Start time: {format(x.startTime, "dd.MM.yyyy hh:mm:ss")}
                                        <br />
                                        Duration: {x.duration}
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </>
        );
    }
}