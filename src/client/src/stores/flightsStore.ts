import { makeObservable, observable, action, runInAction } from "mobx";
import { agent } from "../api/agent";
import { Flight } from "../models/Flight";

class FlightsStore {
    @observable
    flights: Flight[] | null = null;

    @observable
    selectedFlight: Flight | null = null;

    @observable
    isLoading = false;

    constructor() {
        makeObservable(this);
    }

    @action
    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    @action
    setSelectedFlight = (id: number) => {
        let selectedFlight = this.flights?.find(x => x.id === id);

        if (selectedFlight) {
            this.selectedFlight = selectedFlight;
        }
    }

    @action
    clearSelectedFlight = () => {
        this.selectedFlight = null;
    }

    @action
    loadFlights = async (airportId: number) => {
        this.setLoading(true);

        try {
            const payload = await agent.Flights.list(airportId);

            payload.forEach((x: any) => {
                x.startTime = new Date(x.startTime);
            });

            runInAction(() => {
                this.flights = payload;
            });
        } catch (err) {
            console.log(err);
        } finally {
            this.setLoading(false);
        }
    }
}

export const flightsStore = new FlightsStore();