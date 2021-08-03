import React from "react";
import { Box, Container } from "@material-ui/core";
import { toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { Route, Switch } from "react-router-dom";
import { Airports } from "./features/airports/Airports";
import { Header } from "./Header";
import { history } from ".";
import { oktaAuth } from "./oktaAuth";
import { Home } from "./Home";
import { AirportDetails } from "./features/airports/AirportDetails";
import { TestPage } from "./features/map/TestPage";

export class App extends React.Component {
    restoreOriginalUri = (_oktaAuth: any, originalUri: string) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    }

    render() {
        return (
            <Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
                <Header />
                <Container maxWidth="lg">
                    <Box py={2}>
                        <Switch>
                            <Route path="/" exact component={TestPage} />
                            <Route path="/" exact component={Home} />
                            <Route path="/login/callback" component={LoginCallback} />
                            <SecureRoute path="/airports/:id" component={AirportDetails} />
                            <SecureRoute path="/airports" component={Airports} />
                        </Switch>
                    </Box>
                </Container>
            </Security>
        );
    }
};