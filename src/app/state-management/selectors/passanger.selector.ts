import {PassangerState} from "../models";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {passangerEntityAdapter} from "../reducers/passanger-reducer";

export const passangerState = createFeatureSelector<PassangerState>('passangerState');

const {selectAll} = passangerEntityAdapter.getSelectors();

export const getPassangers = createSelector(passangerState, selectAll);

export const getPassangerSelected = () =>
  createSelector(
    passangerState,
    (selectPassangerState) => {
      return selectPassangerState.passangerSelected;
    }
  );
