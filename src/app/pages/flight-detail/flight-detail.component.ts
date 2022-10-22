import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlightProgram, Seat} from "../../api-models";
import {Store} from "@ngrx/store";
import {getFlightProgramSelected} from "../../state-management/selectors";
import {filter, Subscription} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit, OnDestroy {

  flightProgram?: FlightProgram;
  subscriptions = new Subscription();
  flightId = '';

  constructor(
    private readonly store: Store,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('flightId')!;
    const flightSubscription = this.store.select(getFlightProgramSelected)
      .pipe(filter(flightProgram => !!flightProgram))
      .subscribe(flightProgram => this.flightProgram = flightProgram!);
    this.subscriptions.add(flightSubscription);

    console.log('RESULT', this.generateSeats());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  generateSeats(): Seat[] {
    const rows = 14;
    const columns = 4;
    let seats: Seat[] = [];

    for (let indexRow = 1; indexRow <= rows; indexRow++) {
      for (let indexColumn = 1; indexColumn <= columns; indexColumn++) {
        if (indexRow >= 1 && indexRow < 6) {
          seats.push(this.generateAssistanceSeats(`${indexRow}_${indexColumn > 2 ? indexColumn + 2 : indexColumn}`));
        }
        if (indexRow >= 6) {
          seats.push(this.generateEconomySeats(`${indexRow}_${indexColumn > 2 ? indexColumn + 2 : indexColumn}`));
        }
      }
    }
    return seats;
  }

  generateAssistanceSeats(rowColumn: string): Seat {
    return {code: uuidv4(), type: 'ASSISTANCE', status: 'FREE', rowColumn: rowColumn};
  }

  generateEconomySeats(rowColumn: string): Seat {
    return {code: uuidv4(), type: 'ECONOMY', status: 'FREE', rowColumn: rowColumn};
  }


}

