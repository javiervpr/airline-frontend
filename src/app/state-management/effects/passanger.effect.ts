import {Injectable} from "@angular/core";
import {PassangerService} from "../../api-http/passanger/passanger.service";
import {catchError, EMPTY, map, mergeMap, switchMap} from "rxjs";
import {PassangerActions} from "../actions";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Store } from "@ngrx/store";

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

  saveNewPassanger$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PassangerActions.addPassanger),
      switchMap((action) => {
        // this.store.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
        return this.passangerService.post(action.newPassanger).pipe(
          map((data) => {
            // this.store.dispatch(
            //   setAPIStatus({
            //     apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            //   })
            // );
            return PassangerActions.addPassangerSucess({ newPassanger: data });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private passangerService: PassangerService,
    private readonly store: Store
  ) {
  }

}
