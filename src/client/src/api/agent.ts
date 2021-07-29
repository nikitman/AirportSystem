import { ListQueryParams } from "../models/ListQueryParams";
import { oktaAuth } from "../oktaAuth";

const baseUrl = "https://localhost:5001/api/";

async function getWithAuth(endpoint: string) {
    const response = await fetch(baseUrl + endpoint, {
        headers: {
            Authorization: `Bearer ${oktaAuth.getAccessToken()}`
        }
    });

    if (!response.ok) {
        console.log(response);
    }

    return await response.json();
}

const Airports = {
    list: async ({ page, pageSize, sortBy, descending }: ListQueryParams) => {
        const endpoint = `airports?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}`;
        return await getWithAuth(endpoint);
    },

    details: async (id: number) => {
        const endpoint = `airports/${id}`;
        return await getWithAuth(endpoint);
    }
};

const Flights = {
    list: async (airportId: number) => {
        const endpoint = `flights?airportId=${airportId}`;

        return await getWithAuth(endpoint);
    }
}

export const agent = {
    Airports,
    Flights
};