import React from "react";
import { Typography, Box, LinearProgress } from "@material-ui/core";
import { observer } from 'mobx-react';
import { AirportsTable } from "./AirportsTable";
import { airportsStore } from "../../stores/airportsStore";
import { Pagination } from "../../shared/Pagination";

@observer
export class Airports extends React.Component {
    componentDidMount() {
        airportsStore.loadAirports();
    }

    render() {
        if (airportsStore.isLoading) {
            return (
                <Box m={2}>
                    <Typography variant="h3" component="p" align="center" gutterBottom>
                        Loading airports
                    </Typography>
                    <LinearProgress />
                </Box>
            );
        }

        return (
            <>
                <Typography variant="h3" component="h1" gutterBottom>
                    Airports
                </Typography>
                <AirportsTable
                    onSort={this.onSortingParamsChange}
                    airports={airportsStore.airports}
                    currentSortBy={airportsStore.queryParams.sortBy}
                    currentDescending={airportsStore.queryParams.descending}
                />
                <Box py={2} px={4}>
                    <Pagination
                        page={airportsStore.queryParams.page}
                        pageSize={airportsStore.queryParams.pageSize}
                        totalPages={airportsStore.totalPages}
                        onChange={this.onPagingParamsChange}
                    />
                </Box>
            </>
        );
    }

    onSortingParamsChange = (sortBy: string, descending: boolean) => {
        airportsStore.setListQueryParams({ sortBy, descending });
    }

    onPagingParamsChange = (page: number, pageSize: number) => {
        airportsStore.setListQueryParams({ page, pageSize });
    }
}