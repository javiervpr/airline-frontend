import {createAction, props} from "@ngrx/store";
import {FlightProgram} from "../../api-models";

export const loadFlightPrograms = createAction(
  '[Flight Program] Load'
);

export const loadFlightProgramsOnSuccess = createAction(
  '[Flight Program] Load Success',
  props<{ flightPrograms: FlightProgram[] }>()
);

export const addFlightProgram = createAction(
  '[Flight Program] Add',
  props<FlightProgram>()
)

