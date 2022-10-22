import {FlightProgramState} from "../models";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {flightProgramEntityAdapter} from "../reducers/flight-program-reducer";
import {Observable} from "rxjs";
import {FlightProgram} from "../../api-models";

export const flightProgramState = createFeatureSelector<FlightProgramState>('flightProgramState');

const {selectAll} = flightProgramEntityAdapter.getSelectors();

export const getFlightPrograms = createSelector(flightProgramState, selectAll);

export const getFlightProgramSelected =
  createSelector(
    flightProgramState,
    (selectFlightProgramState) => {
      return selectFlightProgramState.flightProgramSelected;
    }
  );
