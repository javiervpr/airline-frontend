import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlightProgram} from "../../api-models";
import {Store} from "@ngrx/store";
import {getFlightProgramSelected} from "../../state-management/selectors";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit, OnDestroy {

  flightProgram?: FlightProgram;
  subscriptions = new Subscription();

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    const flightSubscription = this.store.select(getFlightProgramSelected)
      .pipe(filter(flightProgram => !!flightProgram))
      .subscribe(flightProgram => this.flightProgram = flightProgram!);
    this.subscriptions.add(flightSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
