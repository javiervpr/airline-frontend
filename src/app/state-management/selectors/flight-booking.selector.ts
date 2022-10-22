import {FlightBookingState} from "../models";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {flightBookingEntityAdapter} from "../reducers/flight-booking-reducer";

export const flightBookingState = createFeatureSelector<FlightBookingState>('flightBookingState');

const {selectAll} = flightBookingEntityAdapter.getSelectors();

export const getFlightBookings = createSelector(flightBookingState, selectAll);

export const getFlightBookingSelected = () =>
  createSelector(
    flightBookingState,
    (selectFlightBookingState) => {
      return selectFlightBookingState.flightBookingSelected;
    }
  );
