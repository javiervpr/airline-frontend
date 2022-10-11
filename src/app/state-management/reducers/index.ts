import {
  ActionReducerMap,
} from '@ngrx/store';
import {AirlineState} from "../models";
import {flightProgramReducer} from "./flight-program-reducer";


export const reducers: ActionReducerMap<AirlineState> = {
  flightPrograms: flightProgramReducer,
};
