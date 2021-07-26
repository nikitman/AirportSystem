import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import Airport from "../models/Airport";

export default class AirportsStore {
    airports: Airport[] = [];

    page = 1;
    pageSize = 10;
    totalPages = 0;
    totalCount = 0;

    sortBy = "id";
    descending = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadAirports = async (page = 1, pageSize = 10, sortBy = "id", descending = false) => {
        try {
            const payload = await agent.Airports.list(page, pageSize, sortBy, descending);

            runInAction(() => {
                this.airports = payload.items;
                this.page = page;
                this.pageSize = pageSize;
                this.totalCount = payload.totalCount;
                this.totalPages = payload.totalPages;
                this.sortBy = sortBy;
                this.descending = descending;
            });
        } catch (err) {
            console.log(err);
        }
    }
}