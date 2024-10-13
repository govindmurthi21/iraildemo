import Station from "./station";

namespace ConnectionTypes {
    export type Connection = {
        departure: Stats;
        arrival: Stats;
        id: string;
    }
    
    export type Stats = {
        station: string;
        vehicle: string;
        platform: number;
        stops: Stops;
    }
    
    export type Stops = {
        stop: Stop[];
    
    }
    
    export type Stop = {
        stationinfo: Station;
        scheduledArrivalTime: string;
        scheduledDepartureTime: string;
        id: string
    } 
}


export default ConnectionTypes;