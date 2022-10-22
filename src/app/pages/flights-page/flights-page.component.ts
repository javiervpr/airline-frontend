import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getFlightPrograms} from "../../state-management/selectors";
import {FlightProgram} from "../../api-models";
import { FlightProgramActions } from 'src/app/state-management/actions';
import {FlightProgramService} from "../../api-http/flight-program/flight-program.service";

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss']
})
export class FlightsPageComponent implements OnInit {

  flightPrograms: FlightProgram[] = [];

  constructor(
    private readonly store: Store,
    private flightser: FlightProgramService
  ) {
  }

  ngOnInit() {
    this.flightser.get().subscribe();
    this.store.dispatch(FlightProgramActions.loadFlightPrograms());
    this.store.select(getFlightPrograms)
      .subscribe(
      flightPrograms => this.flightPrograms = flightPrograms
    );
  }

  openDetails(flightProgram: FlightProgram) {
    this.store.dispatch(FlightProgramActions.selectFlightProgram(flightProgram));
  }
}
