import { Paper, Table, TableContainer, TableHead, TableRow, Typography, TableCell, TableBody } from "@material-ui/core";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";
import { useStore } from "./stores/store";
import { observer } from 'mobx-react-lite';

export default observer(function Airports() {
    const { oktaAuth } = useOktaAuth();
    const { airportsStore: { airports, loadAirports } } = useStore();

    useEffect(() => {
        if (airports.length === 0) {
            loadAirports(oktaAuth.getAccessToken());
        }
    }, [airports.length, loadAirports, oktaAuth])

    if (airports.length === 0) {
        return (
            <Typography variant="h3" component="p">
                Loading airports...
            </Typography>
        );
    }

    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>
                Airports
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Coordinates</TableCell>
                            <TableCell>Inbound Flights</TableCell>
                            <TableCell>Outbound Flights</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {airports.map((airport) => (
                            <TableRow key={airport.id}>
                                <TableCell>{airport.name}</TableCell>
                                <TableCell>{airport.city}</TableCell>
                                <TableCell>{airport.country}</TableCell>
                                <TableCell>{`${airport.latitude},${airport.longitude}`}</TableCell>
                                <TableCell>{airport.inboundFlightsCount}</TableCell>
                                <TableCell>{airport.outboundFlightsCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
});