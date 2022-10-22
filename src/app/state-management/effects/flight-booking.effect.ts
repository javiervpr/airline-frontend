import {Injectable} from "@angular/core";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {FlightBookingActions} from "../actions";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { FlightBookingService } from "../../api-http/flight-program-booking/flight-program-booking.service";

@Injectable()
export class FlightBookingEffect {


  loadFlightBookings$ = createEffect(() => this.actions$.pipe(
      ofType(FlightBookingActions.loadFlightBookings),
      mergeMap(() => this.flightBookingService.getAll()
        .pipe(
          map(flightBookings => FlightBookingActions.loadFlightBookingsOnSuccess({flightBookings})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private flightBookingService: FlightBookingService
  ) {
  }

}
