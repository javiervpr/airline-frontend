import {createAction, props} from "@ngrx/store";
import {Passanger} from "../../api-models";

export const loadPassangers = createAction(
  '[Passanger] Load'
);

export const loadPassangersOnSuccess = createAction(
  '[Passanger] Load Success',
  props<{ passangers: Passanger[] }>()
);

export const addPassanger = createAction(
  '[Passanger] Add',
  props<Passanger>()
)

