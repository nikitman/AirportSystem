import { OktaAuth } from "@okta/okta-auth-js";

const config = {
    oidc: {
        clientId: "0oa1aqt0i9yV7sN3V5d7",
        issuer: "https://dev-03396708.okta.com/oauth2/default",
        redirectUri: `${window.location.origin}/login/callback`,
        scopes: ["openid", "profile", "email"],
        pkce: true
    }
};

export const oktaAuth = new OktaAuth(config.oidc);