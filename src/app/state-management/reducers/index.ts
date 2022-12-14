import {
  ActionReducerMap,
} from '@ngrx/store';
import {AirlineState} from "../models";
import { flightBookingReducer } from './flight-booking-reducer';
import {flightProgramReducer} from "./flight-program-reducer";
import { passangerReducer } from './passanger-reducer';


export const reducers: ActionReducerMap<AirlineState> = {
  flightProgramState: flightProgramReducer,
  passangerState: passangerReducer,
  flightBookingState : flightBookingReducer,
};
