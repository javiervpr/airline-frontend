import {FlightBookingState} from "../models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {FlightBooking} from "../../api-models";
import {createReducer, on} from "@ngrx/store";
import {FlightBookingActions} from "../actions";

const selectId = (flightBooking: FlightBooking) => flightBooking.id;

export const flightBookingEntityAdapter: EntityAdapter<FlightBooking> = createEntityAdapter<FlightBooking>({
  selectId
});

export const initialState: FlightBookingState = flightBookingEntityAdapter.getInitialState({
  flightBookingSelected: undefined
});

export const flightBookingReducer = createReducer(
  initialState,
  on(FlightBookingActions.loadFlightBookingsOnSuccess,
    (state: FlightBookingState, next: { flightBookings: FlightBooking[] }) => {
      return flightBookingEntityAdapter.addMany(next.flightBookings, state);
    })
);
