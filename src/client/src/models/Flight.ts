export interface Flight {
    id: number;
    duration: string;
    status: string;
    startTime: Date;
    arrivalAirportId: number;
    arrivalAirportName: string;
    arrivalAirportLatitude: number;
    arrivalAirportLongitude: number;
    departureAirportId: number;
    departureAirportName: string;
    departureAirportLatitude: number;
    departureAirportLongitude: number;
    selected?: boolean;
    color?: string;
}