import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip, withStyles, Box, Typography } from "@material-ui/core";
import { Airport } from "../../models/Airport";
import { SortingTableCell } from "../../shared/SortingTableCell";

interface AirportsTableProps {
    airports: Airport[];
    currentSortBy: string;
    currentDescending: boolean;
    onSort: (sortBy: string, descending: boolean) => void;
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: "white",
        borderBottom: "2px solid"
    },
}))(TableRow);

const StyledChip = withStyles((theme) => ({
    root: {
        borderRadius: "4px",
        padding: "0px 5px",
        height: "25px",
        backgroundColor: theme.palette.text.primary,
        textTransform: "uppercase",
        color: theme.palette.common.white
    }
}))(Chip);

export class AirportsTable extends React.Component<AirportsTableProps> {
    render() {
        const onSort = this.props.onSort;
        const current = { sortBy: this.props.currentSortBy, descending: this.props.currentDescending };

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <SortingTableCell current={current} onSort={onSort} sortBy="id" align="left">Identifier</SortingTableCell>
                            <SortingTableCell current={current} onSort={onSort} sortBy="city" align="left">City</SortingTableCell>
                            <SortingTableCell current={current} onSort={onSort} sortBy="country" align="right">Country</SortingTableCell>
                            <SortingTableCell current={current} onSort={onSort} sortBy="latitude" align="right">Latitude</SortingTableCell>
                            <SortingTableCell current={current} onSort={onSort} sortBy="longitude" align="right">Longitude</SortingTableCell>
                            <SortingTableCell current={current} onSort={onSort} sortBy="inboundFlights">Inbound Flights</SortingTableCell>
                            <SortingTableCell current={current} onSort={onSort} sortBy="outboundFlights">Outbound Flights</SortingTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.airports.map(airport => (
                            <StyledTableRow key={airport.id}>
                                <TableCell>
                                    <span style={{ textDecoration: "underline", display: "block" }}>
                                        #{airport.id}
                                    </span>
                                    <Typography variant="caption">
                                        {airport.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <StyledChip label={airport.city} />
                                </TableCell>
                                <TableCell align="right">{airport.country}</TableCell>
                                <TableCell align="right">
                                    <Box fontWeight="bold">
                                        {airport.latitude}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Box fontWeight="bold">
                                        {airport.longitude}
                                    </Box>
                                </TableCell>
                                <TableCell>{airport.inboundFlightsCount}</TableCell>
                                <TableCell>{airport.outboundFlightsCount}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}