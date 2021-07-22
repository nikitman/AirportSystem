import { makeAutoObservable } from "mobx";
import Airport from "../models/Airport";
import oktaConfig from "../oktaConfig";

export default class AirportsStore {
    airports: Airport[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAirports = (airports: Airport[]) => {
        this.airports = airports;
    }

    loadAirports = async (accessToken: any) => {
        try {
            const response = await fetch(oktaConfig.resourceServer.airportsUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.log(response);
            }

            this.setAirports(await response.json());
        } catch (err) {
            console.log(err);
        }
    }
}