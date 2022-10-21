import {Flight} from "./flight";

// export interface FlightProgram {
//   id: number
//   created_at: string
//   updated_at: string
//   uuid: string
//   source_airport_code: string
//   destiny_airport_code: string
//   departure_week_days: string
//   flight_program_id: any
//   flight: Flight
//   flight_programs: any[]
// }

export interface FlightProgram {
  id: number;
  created_at: string;
  updated_at: string;
  startTime: string;
  endTime: string;
  crewUuid: string;
  aircraftUuid: string;
  status: string;
  flightProgramId: number;
  uuid: string;
  information: Information;
}

export interface Ticket {
  clase: string;
  price: number;
  quant: number;
}

export interface AvaibleSeat {
  code: string;
  type: string;
  status: string;
  rowColumn?: string;
}

export interface Information {
  tickets: Ticket[];
  avaibleSeats: AvaibleSeat[];
}










