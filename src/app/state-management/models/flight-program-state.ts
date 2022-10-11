import {EntityState} from "@ngrx/entity";
import {FlightProgram} from "../../api-models";

export interface FlightProgramState extends EntityState<FlightProgram> {
  flightProgramSelected?: FlightProgram;
}
