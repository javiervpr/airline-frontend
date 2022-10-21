import {CheckIn} from "../../api-models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {CheckInState} from "../models";
import {createReducer, on} from "@ngrx/store";
import { CheckInActions } from "../actions";

const selectId = (checkIn: CheckIn) => checkIn.checkInId;

export const checkInEntityAdapter: EntityAdapter<CheckIn> = createEntityAdapter<CheckIn>({
  selectId
});

export const initialState: CheckInState = checkInEntityAdapter.getInitialState({
});

export const checkInReducer = createReducer(
  initialState,
  on(CheckInActions.loadCheckInsOnSuccess,
    (state: CheckInState, next: { checkIns: CheckIn[] }) => {
      return checkInEntityAdapter.addMany(next.checkIns, state);
    }),
  on(CheckInActions.addCheckInOnSuccess,
    (state: CheckInState, next: CheckIn) => {
      return {...state, checkInSelected: next};
    })
);
