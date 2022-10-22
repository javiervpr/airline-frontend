import {Observable} from "rxjs";

export interface AsyncCommand {
  execute: Observable<any>
}
