import {Crew} from "./crew";
import {Aircraft} from "./aircraft";
import {Ticket} from "./ticket";
import {AvaibleSeat} from "./avaible-seat";

export interface Flight {
  id: number
  created_at: string
  updated_at: string
  uuid: string
  unique_code: string
  startTime: string
  endTime: string
  crew: Crew
  aircraft: Aircraft
  status: string
  flight_program_id: number
  information: Information
  notified: number
  flightCanceledNotified: number
}

export interface Information {
  tickets: Ticket[]
  avaibleSeats: AvaibleSeat[]
}
