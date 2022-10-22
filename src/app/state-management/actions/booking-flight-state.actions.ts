import {createAction, props} from "@ngrx/store";
import {FlightBooking} from "../../api-models";

export const loadFlightBookings = createAction(
  '[Flight Booking] Load'
);

export const loadFlightBookingsOnSuccess = createAction(
  '[Flight Booking] Load Success',
  props<{ flightBookings: FlightBooking[] }>()
);

export const addFlightBooking = createAction(
  '[Flight Booking] Add',
  props<FlightBooking>()
)

