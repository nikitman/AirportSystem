import { AppBar, Button, Chip, Grid, Toolbar } from "@material-ui/core";
import { UserClaims } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState<UserClaims | null>(null);

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            setUserInfo(null);
        } else {
            oktaAuth.getUser().then((info) => {
                setUserInfo(info);
            });
        }
    }, [authState, oktaAuth]);

    const login = async () => oktaAuth.signInWithRedirect();

    const logout = async () => {
        try {
            await oktaAuth.signOut();
        } catch (err) {
            console.log(err);
        }
    }

    if (!authState) {
        return null;
    }

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
                            {authState.isAuthenticated && (
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
                            {authState.isAuthenticated && (
                                <>
                                    <Grid item>
                                        <Chip label={userInfo?.email} color="primary" />
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                    <Button color="inherit" onClick={logout}>Logout</Button>
                                </>
                            )}
                            {!(authState as any).isPending && !authState.isAuthenticated && (
                                <Grid item>
                                    <Button color="inherit" onClick={login}>Login</Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}