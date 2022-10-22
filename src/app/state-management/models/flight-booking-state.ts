import {EntityState} from "@ngrx/entity";
import {FlightBooking} from "../../api-models";

export interface FlightBookingState extends EntityState<FlightBooking> {
  flightBookingSelected?: FlightBooking;
}
