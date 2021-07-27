import { AppBar, Button, Chip, Grid, Toolbar } from "@material-ui/core";
import { UserClaims } from "@okta/okta-auth-js";
import { withOktaAuth } from "@okta/okta-react";
import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import React from "react";
import { Link } from "react-router-dom";
import { oktaAuth } from "./oktaAuth";

export const Header = withOktaAuth(
    class Header extends React.Component<IOktaContext, { userClaims: UserClaims | null }> {
        constructor(props: IOktaContext) {
            super(props);

            this.state = {
                userClaims: null
            };
        }

        async componentDidMount() {
            await this.setUserClaims();
        }

        async componentDidUpdate() {
            await this.setUserClaims();
        }

        render() {
            const isAuthenticated = this.props.authState?.isAuthenticated;

            return (
                <AppBar position="sticky" color="inherit">
                    <Toolbar variant="dense">
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button color="inherit" to="/" component={Link}>
                                            Home
                                        </Button>
                                    </Grid>
                                    {isAuthenticated && (
                                        <Grid item>
                                            <Button color="inherit" to="/airports" component={Link}>
                                                Airports
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                    {isAuthenticated && (
                                        <>
                                            <Grid item>
                                                <Chip label={this.state.userClaims?.email} color="primary" />
                                            </Grid>
                                            <Grid item>
                                            </Grid>
                                            <Button color="inherit" onClick={this.logout}>Logout</Button>
                                        </>
                                    )}
                                    {!isAuthenticated && (
                                        <Grid item>
                                            <Button color="inherit" onClick={this.login}>Login</Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            );
        }

        login = async () => {
            await oktaAuth.signInWithRedirect();
        }

        logout = async () => {
            await oktaAuth.signOut();
        }

        setUserClaims = async () => {
            if (this.props.authState?.isAuthenticated && !this.state.userClaims) {
                const userClaims = await oktaAuth.getUser();
                this.setState({ userClaims });
            }

            if (!this.props.authState?.isAuthenticated && this.state.userClaims) {
                this.setState({ userClaims: null });
            }
        }
    }
);