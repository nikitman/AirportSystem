import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface Props {
    page: number;
    pageSize: number;
    totalPages: number;
    onChange: (page: number, pageSize: number) => void;
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

export default observer(function Pagination(props: Props) {
    const [page, setPage] = useState(props.page);
    const [pageSize, setPageSize] = useState(props.pageSize);

    const [pageInput, setPageInput] = useState(props.page.toString());
    const [pageSizeInput, setPageSizeInput] = useState(props.pageSize.toString());

    const handlePageChange = (action: "back" | "forward" | "input") => {
        let nextPage = page;

        switch (action) {
            case "back":
                nextPage = Math.max(1, page - 1);
                break;
            case "forward":
                nextPage = Math.min(props.totalPages, page + 1);
                break;
            case "input":
                const parsedInput = parseInt(pageInput);

                if (!isNaN(parsedInput) && parsedInput >= 1 && parsedInput <= props.totalPages) {
                    nextPage = parsedInput;
                }
        }

        if (nextPage !== page) {
            setPage(nextPage);
            props.onChange(nextPage, pageSize);
        }

        setPageInput(nextPage.toString());
    }

    const handlePageSizeChange = () => {
        let nextPageSize = pageSize;
        const parsedPageSize = parseInt(pageSizeInput);

        if (!isNaN(parsedPageSize) && parsedPageSize >= 1) {
            nextPageSize = parsedPageSize;
        }

        if (nextPageSize !== pageSize) {
            setPageSize(nextPageSize);
            props.onChange(page, nextPageSize);
        }

        setPageSizeInput(nextPageSize.toString());
    }

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <StyledButton onClick={() => handlePageChange("back")}>
                            <FontAwesomeIcon icon="chevron-left" />
                        </StyledButton>
                    </Grid>
                    <Grid item>
                        <StyledTextField value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            onBlur={() => handlePageChange("input")}
                            variant="outlined" />
                    </Grid>
                    <Grid item>
                        <StyledButton onClick={(e) => handlePageChange("forward")}>
                            <FontAwesomeIcon icon="chevron-right" />
                        </StyledButton>
                    </Grid>
                    <Grid item>
                        of {props.totalPages} {props.totalPages === 1 ? "page" : "pages"}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        Showing
                    </Grid>
                    <Grid item>
                        <StyledTextField value={pageSizeInput}
                            onChange={(e) => setPageSizeInput(e.target.value)}
                            onBlur={handlePageSizeChange}
                            variant="outlined" />
                    </Grid>
                    <Grid item>
                        {pageSizeInput === "1" ? "item" : "items"} per page
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});