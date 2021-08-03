import { Checkbox, FormControlLabel, Paper, withStyles } from '@material-ui/core';
import { Component } from 'react';

interface Props {
    dashed: boolean;
    curved: boolean;
    directed: boolean;
    handleChange: (dashed: boolean, curved: boolean, directed: boolean) => void;
}

const StyledPaper = withStyles(theme => ({
    root: {
        display: "inline-flex",
        alignItems: "center",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,

        "& > *": {
            margin: `0 ${theme.spacing(1)}px`
        }
    }
}))(Paper);

export class LineOptionsControl extends Component<Props> {
    render() {
        const dashedCheckbox = (
            <Checkbox
                value={this.props.dashed}
                onChange={e => this.props.handleChange(e.target.checked, this.props.curved, this.props.directed)} />
        );

        const curvedCheckBox = (
            <Checkbox
                value={this.props.curved}
                onChange={e => this.props.handleChange(this.props.dashed, e.target.checked, this.props.directed)} />
        );

        const directedCheckBox = (
            <Checkbox
                value={this.props.directed}
                onChange={e => this.props.handleChange(this.props.dashed, this.props.curved, e.target.checked)} />
        );

        return (
            <StyledPaper>
                <FormControlLabel control={dashedCheckbox} label="Dashed" />
                <FormControlLabel control={curvedCheckBox} label="Curved" />
                <FormControlLabel control={directedCheckBox} label="Directed" />
            </StyledPaper>
        );
    }
}