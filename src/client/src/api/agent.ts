import { ListQueryParams } from "../models/ListQueryParams";
import { oktaAuth } from "../oktaAuth";

const Airports = {
    list: async ({ page, pageSize, sortBy, descending }: ListQueryParams) => {
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

export const agent = {
    Airports
};