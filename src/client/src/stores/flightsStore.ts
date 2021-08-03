import { makeObservable, observable, action, runInAction, computed } from "mobx";
import { agent } from "../api/agent";
import { Flight } from "../models/Flight";

class FlightsStore {
    @observable
    flights: Flight[] = [];

    @observable
    isLoading = false;

    constructor() {
        makeObservable(this);
    }

    @computed
    get selectedFlights() {
        return this.flights?.filter(x => x.selected);
    }

    @action
    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    @action
    setFlightColor = (id: number, color: string) => {
        this.flights.find(x => x.id === id)!.color = color;
    }

    @action
    toggleFlight = (id: number) => {
        const flight = this.flights.find(x => x.id === id);

        if (flight) {
            flight.selected = !flight.selected;
        }
    }

    @action
    clearSelectedFlights = () => {
        this.flights.forEach(x => x.selected = false);
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