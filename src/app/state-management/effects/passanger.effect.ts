import {Injectable} from "@angular/core";
import {PassangerService} from "../../api-http/passanger/passanger.service";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {PassangerActions} from "../actions";
import {Actions, createEffect, ofType} from '@ngrx/effects';

@Injectable()
export class PassangerEffect {


  loadPassangers$ = createEffect(() => this.actions$.pipe(
      ofType(PassangerActions.loadPassangers),
      mergeMap(() => this.passangerService.getAll()
        .pipe(
          map(passangers => PassangerActions.loadPassangersOnSuccess({passangers})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private passangerService: PassangerService
  ) {
  }

}
