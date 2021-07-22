export default interface Airport {
    id: number;
    name: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    inboundFlightsCount: number;
    outboundFlightsCount: number;
}
