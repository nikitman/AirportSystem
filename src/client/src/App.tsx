import { Box, Container } from "@material-ui/core";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { Route, Switch, useHistory } from "react-router-dom";
import Airports from "./Airports";
import Home from "./Home";
import NavBar from "./NavBar";
import oktaConfig from "./oktaConfig";

const oktaAuth = new OktaAuth(oktaConfig.oidc);

export default function App() {
    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    }

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <NavBar />

            <Container maxWidth="lg">
                <Box py={2}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login/callback" component={LoginCallback} />
                        <SecureRoute path="/airports" component={Airports} />
                    </Switch>
                </Box>
            </Container>
        </Security>
    );
}