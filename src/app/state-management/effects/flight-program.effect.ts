import {Injectable} from "@angular/core";
import {FlightProgramService} from "../../api-http/flight-program/flight-program.service";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {FlightProgramActions} from "../actions";
import {Actions, createEffect, ofType} from '@ngrx/effects';

@Injectable()
export class FlightProgramEffect {


  loadMovies$ = createEffect(() => this.actions$.pipe(
      ofType(FlightProgramActions.loadFlightPrograms),
      mergeMap(() => this.flightProgramService.getAll()
        .pipe(
          map(flightPrograms => FlightProgramActions.loadFlightProgramsOnSuccess({flightPrograms})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private flightProgramService: FlightProgramService
  ) {
  }

}
