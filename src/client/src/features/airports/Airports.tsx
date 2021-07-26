import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useStore } from "../../stores/store";
import { observer } from 'mobx-react-lite';

import Pagination from "../../shared/Pagination";
import AirportsTable from "./AirportsTable";

export default observer(function Airports() {
    const { airportsStore: { airports, page, pageSize, totalPages, sortBy, descending, loadAirports } } = useStore();

    useEffect(() => {
        loadAirports();
    }, [loadAirports]);

    const onSortingParamsChange = (nextSortBy: string, nextDescending: boolean) => {
        loadAirports(page, pageSize, nextSortBy, nextDescending);
    }

    const onPagingParamsChange = (nextPage: number, nextPageSize: number) => {
        loadAirports(nextPage, nextPageSize, sortBy, descending);
    }

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
            <AirportsTable onSort={onSortingParamsChange} airports={airports} />
            <Box py={2} px={4}>
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    onChange={onPagingParamsChange}
                />
            </Box>
        </>
    );
});