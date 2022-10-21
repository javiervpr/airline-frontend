import {createAction, props} from "@ngrx/store";
import {CheckIn} from "../../api-models";

export const loadCheckIns = createAction(
  '[Check-In] Load'
);

export const loadCheckInsOnSuccess = createAction(
  '[Check-In] Load Success',
  props<{ checkIns: CheckIn[] }>()
);

export const addCheckIn = createAction(
  '[Check-In] Add',
  props<CheckIn>()
);

export const addCheckInOnSuccess = createAction(
  '[Check-In] Added',
  props<CheckIn>()
);
