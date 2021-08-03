import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { ColorPicker } from 'material-ui-color';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Flight } from '../../models/Flight';
import { flightsStore } from '../../stores/flightsStore';

interface Props {
    direction: "inbound" | "outbound";
    flights: Flight[];
}

@observer
export class FlightsTable extends Component<Props> {
    render() {
        return (
            <>
                <Typography variant="h6" component="h2" gutterBottom>
                    {this.props.direction === "inbound" ? "Inbound Flights" : "Outbound Flights"}
                </Typography>
                <TableContainer component={Paper} style={{ maxHeight: 200 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{this.props.direction === "inbound" ? "From" : "To"}</TableCell>
                                <TableCell>Starts at</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.flights.map(flight => (
                                <TableRow key={flight.id}>
                                    <TableCell>
                                        {this.props.direction === "inbound" ? flight.departureAirportName : flight.arrivalAirportName}
                                    </TableCell>
                                    <TableCell>{format(flight.startTime, "dd.MM.yyyy hh:mm:ss")}</TableCell>
                                    <TableCell>{flight.duration}</TableCell>
                                    <TableCell>
                                        <ColorPicker
                                            value={`#${flight.color || "3f51b5"}`}
                                            onChange={e => flightsStore.setFlightColor(flight.id, e.hex)}
                                            hideTextfield
                                            deferred />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            value={flight.selected}
                                            onChange={e => flightsStore.toggleFlight(flight.id)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}