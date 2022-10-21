import {EntityState} from "@ngrx/entity";
import {Passanger} from "../../api-models";

export interface PassangerState extends EntityState<Passanger> {
  passangerSelected?: Passanger;
}
