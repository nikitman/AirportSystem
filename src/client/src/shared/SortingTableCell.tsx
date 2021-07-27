import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell, TableCellProps, Button, withStyles } from "@material-ui/core";

interface SortingTableCellProps extends TableCellProps {
    sortBy: string;
    current: { sortBy: string, descending: boolean },
    children: any;
    onSort: (column: string, descending: boolean) => void;
}

const StyledButton = withStyles((theme) => ({
    root: {
        textTransform: "none",
        fontWeight: "normal",
        paddingLeft: "0",
        paddingRight: "0",

        "&:hover": {
            background: "none",
        }
    },

    label: {
        justifyContent: "start",

        "& svg": {
            marginLeft: "5px",
        }
    }
}))(Button);

export class SortingTableCell extends React.Component<SortingTableCellProps> {
    render() {
        const descending = this.props.current.sortBy === this.props.sortBy
            ? this.props.current.descending
            : null;

        const opacity = descending === null ? 0.5 : 1;

        const icon = descending
            ? <FontAwesomeIcon icon="chevron-up" opacity={opacity} />
            : <FontAwesomeIcon icon="chevron-down" opacity={opacity} />

        return (
            <TableCell {...this.props}>
                <StyledButton onClick={this.toggleSort} disableRipple={true}>
                    {this.props.children}
                    {icon}
                </StyledButton>
            </TableCell>
        );
    }

    toggleSort = () => {
        const descending = this.props.current.sortBy === this.props.sortBy
            ? !this.props.current.descending
            : false;

        this.props.onSort(this.props.sortBy, descending);
    }
}