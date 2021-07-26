import { OktaAuth } from "@okta/okta-auth-js";
import oktaConfig from "../oktaConfig";

const oktaAuth = new OktaAuth(oktaConfig.oidc);

const Airports = {
    list: async (page: number, pageSize: number, sortBy: string, descending: boolean) => {
        const url =
            `https://localhost:5001/api/airports?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${oktaAuth.getAccessToken()}`
            }
        });

        if (!response.ok) {
            console.log(response);
        }

        return await response.json();
    }
}

const agent = {
    Airports
};

export default agent;