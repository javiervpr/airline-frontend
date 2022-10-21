// import {AsyncCommand} from "../../../api-models/async-command";
// import {filter, first, Observable} from "rxjs";
// import {FlightProgram} from "../../../api-models";
// import {getFlightProgramSelected} from "../flight-program.selector";
// import {Store} from "@ngrx/store";
//
// export class GetFlightProgramSelectedCmdSelector implements AsyncCommand {
//
//   constructor(
//     private readonly store: Store
//   ) {
//   }
//
//
//   execute(): Observable<FlightProgram | undefined> {
//     return this.store.select(getFlightProgramSelected)
//       .pipe(
//         filter(flightProgram => !!flightProgram)
//       )
//   }
//
//
// }
