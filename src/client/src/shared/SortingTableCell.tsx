import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell, TableCellProps, Button, withStyles } from "@material-ui/core";
import { useState } from "react";

interface Props extends TableCellProps {
    sortBy: string;
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

export default function SortingTableCell({ sortBy, onSort, children, ...rest }: Props) {
    const [descending, setDescending] = useState(false);

    const toggleSort = () => {
        const nextDescending = !descending;
        onSort(sortBy, nextDescending);
        setDescending(nextDescending);
    }

    return (
        <TableCell {...rest}>
            <StyledButton onClick={toggleSort} disableRipple={true}>
                {children}
                {descending
                    ? <FontAwesomeIcon icon="chevron-up" />
                    : <FontAwesomeIcon icon="chevron-down" />
                }
            </StyledButton>
        </TableCell>
    );
}