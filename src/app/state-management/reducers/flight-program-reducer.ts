import {FlightProgramState} from "../models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {FlightProgram} from "../../api-models";
import {createReducer, on} from "@ngrx/store";
import {FlightProgramActions} from "../actions";

const selectId = (flightProgram: FlightProgram) => flightProgram.id;

export const flightProgramEntityAdapter: EntityAdapter<FlightProgram> = createEntityAdapter<FlightProgram>({
  selectId
});

export const initialState: FlightProgramState = flightProgramEntityAdapter.getInitialState({
  flightProgramSelected: undefined
});

export const flightProgramReducer = createReducer(
  initialState,
  on(FlightProgramActions.loadFlightProgramsOnSuccess,
    (state: FlightProgramState, next: { flightPrograms: FlightProgram[] }) => {
      return flightProgramEntityAdapter.addMany(next.flightPrograms, state);
    })
);
