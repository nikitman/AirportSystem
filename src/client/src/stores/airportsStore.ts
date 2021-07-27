import { makeObservable, observable, action, runInAction, reaction } from "mobx";
import { agent } from "../api/agent";
import { Airport } from "../models/Airport";
import { ListQueryParams } from "../models/ListQueryParams";

class AirportsStore {
    @observable
    airports: Airport[] | null = null;

    @observable
    queryParams: ListQueryParams = {
        page: 1,
        pageSize: 5,
        sortBy: "id",
        descending: false
    };

    @observable
    totalPages = 0;

    @observable
    isLoading = false;

    constructor() {
        makeObservable(this);

        reaction(
            () => this.queryParams,
            () => this.loadAirports());
    }

    @action
    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    @action
    setListQueryParams = (params: Partial<ListQueryParams>) => {
        this.queryParams = {
            ...this.queryParams,
            ...params
        };
    }

    @action
    loadAirports = async () => {
        this.setLoading(true);

        try {
            const payload = await agent.Airports.list(this.queryParams);

            runInAction(() => {
                this.airports = payload.items;
                this.totalPages = payload.totalPages;

                if (this.queryParams.page > payload.totalPages) {
                    this.queryParams.page = payload.totalPages;
                }
            });
        } catch (err) {
            console.log(err);
        } finally {
            this.setLoading(false);
        }
    }
}

export const airportsStore = new AirportsStore();