import {Flight} from "./flight";

export interface FlightProgram {
  id: number
  created_at: string
  updated_at: string
  uuid: string
  source_airport_code: string
  destiny_airport_code: string
  departure_week_days: string
  flight_program_id: any
  flight: Flight
  flight_programs: any[]
}














