import {FlightProgramState} from "./flight-program-state";
import { PassangerState } from "./passanger-state";

export interface AirlineState {
  flightProgramState: FlightProgramState,
  passangerState: PassangerState
}
