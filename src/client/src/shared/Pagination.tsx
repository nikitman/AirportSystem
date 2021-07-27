import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";

interface PaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    onChange: (page: number, pageSize: number) => void;
}

interface PaginationState {
    page: string;
    pageSize: string;
}

const StyledButton = withStyles(theme => ({
    root: {
        backgroundColor: "#212121",
        color: theme.palette.common.white,
        padding: "5px 8px",
        minWidth: "0",

        "&:hover": {
            backgroundColor: "#212121"
        }
    }
}))(Button);

const StyledTextField = withStyles(theme => ({
    root: {
        width: "50px",

        "& .MuiOutlinedInput-input": {
            padding: "10px",
            textAlign: "center"
        }
    }
}))(TextField);

export class Pagination extends React.Component<PaginationProps, PaginationState> {
    constructor(props: PaginationProps) {
        super(props);

        this.state = {
            page: props.page.toString(),
            pageSize: props.pageSize.toString()
        };
    }

    componentWillReceiveProps(nextProps: PaginationProps) {
        this.setState({ page: nextProps.page.toString() });
    }

    render() {
        return (
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <StyledButton onClick={() => this.handlePageChange("back")}>
                                <FontAwesomeIcon icon="chevron-left" />
                            </StyledButton>
                        </Grid>
                        <Grid item>
                            <StyledTextField value={this.state.page}
                                onChange={(e) => this.setState({ page: e.target.value })}
                                onBlur={() => this.handlePageChange("input")}
                                variant="outlined" />
                        </Grid>
                        <Grid item>
                            <StyledButton onClick={(e) => this.handlePageChange("forward")}>
                                <FontAwesomeIcon icon="chevron-right" />
                            </StyledButton>
                        </Grid>
                        <Grid item>
                            of {this.props.totalPages} {this.props.totalPages === 1 ? "page" : "pages"}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            Showing
                        </Grid>
                        <Grid item>
                            <StyledTextField value={this.state.pageSize}
                                onChange={(e) => this.setState({ pageSize: e.target.value })}
                                onBlur={this.handlePageSizeChange}
                                variant="outlined" />
                        </Grid>
                        <Grid item>
                            {this.state.pageSize === "1" ? "item" : "items"} per page
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    handlePageChange = (action: "back" | "forward" | "input") => {
        let nextPage = this.props.page;

        switch (action) {
            case "back":
                nextPage = Math.max(1, this.props.page - 1);
                break;
            case "forward":
                nextPage = Math.min(this.props.totalPages, this.props.page + 1);
                break;
            case "input":
                const parsedInput = parseInt(this.state.page);

                if (!isNaN(parsedInput) && parsedInput >= 1 && parsedInput <= this.props.totalPages) {
                    nextPage = parsedInput;
                }
        }

        if (nextPage !== this.props.page) {
            this.props.onChange(nextPage, this.props.pageSize);
        }

        this.setState({ page: nextPage.toString() });
    }

    handlePageSizeChange = () => {
        let nextPageSize = this.props.pageSize;
        const parsedPageSize = parseInt(this.state.pageSize);

        if (!isNaN(parsedPageSize) && parsedPageSize >= 1) {
            nextPageSize = parsedPageSize;
        }

        if (nextPageSize !== this.props.pageSize) {
            this.props.onChange(this.props.page, nextPageSize);
        }

        this.setState({ pageSize: nextPageSize.toString() });
    }
}