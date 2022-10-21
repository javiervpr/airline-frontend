import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import { FlightProgramActions, PassangerActions} from './state-management/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'airline-frontend';

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    this.store.dispatch(FlightProgramActions.loadFlightPrograms());
    this.store.dispatch(PassangerActions.loadPassangers());
  }
}
