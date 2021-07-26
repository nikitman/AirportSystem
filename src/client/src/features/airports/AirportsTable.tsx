import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip, withStyles, Box, Typography } from "@material-ui/core";
import Airport from "../../models/Airport";
import SortingTableCell from "../../shared/SortingTableCell";

interface Props {
    airports: Airport[];
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

export default function AirportsTable({ airports, onSort }: Props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <SortingTableCell onSort={onSort} sortBy="id" align="left">Identifier</SortingTableCell>
                        <SortingTableCell onSort={onSort} sortBy="city" align="left">City</SortingTableCell>
                        <SortingTableCell onSort={onSort} sortBy="country" align="right">Country</SortingTableCell>
                        <SortingTableCell onSort={onSort} sortBy="latitude" align="right">Latitude</SortingTableCell>
                        <SortingTableCell onSort={onSort} sortBy="longitude" align="right">Longitude</SortingTableCell>
                        <SortingTableCell onSort={onSort} sortBy="inboundFlights">Inbound Flights</SortingTableCell>
                        <SortingTableCell onSort={onSort} sortBy="outboundFlights">Outbound Flights</SortingTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {airports.map((airport) => (
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
    )
}