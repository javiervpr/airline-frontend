import {PassangerState} from "../models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {Passanger} from "../../api-models";
import {createReducer, on} from "@ngrx/store";
import {PassangerActions} from "../actions";

const selectId = (passanger: Passanger) => passanger.id;

export const passangerEntityAdapter: EntityAdapter<Passanger> = createEntityAdapter<Passanger>({
  selectId
});

export const initialState: PassangerState = passangerEntityAdapter.getInitialState({
  passangerSelected: undefined
});

export const passangerReducer = createReducer(
  initialState,
  on(PassangerActions.loadPassangersOnSuccess,
    (state: PassangerState, next: { passangers: Passanger[] }) => {
      return passangerEntityAdapter.addMany(next.passangers, state);
    })
);
