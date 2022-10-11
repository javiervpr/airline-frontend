import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getFlightPrograms} from "../../state-management/selectors";
import {FlightProgram} from "../../api-models";

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss']
})
export class FlightsPageComponent implements OnInit {

  flightPrograms: FlightProgram[] = [];

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    this.store.select(getFlightPrograms)
      .subscribe(
      flightPrograms => this.flightPrograms = flightPrograms
    );
  }

}
