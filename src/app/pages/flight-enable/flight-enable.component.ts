import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FlightApiService } from 'src/app/api-http/flight/flight-api.service';
import { Seat } from 'src/app/api-models';
import { aircrafts } from 'src/app/utils/aircrafts';
import { crews } from 'src/app/utils/crew';
import { makeid } from 'src/app/utils/makeId';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-flight-enable',
  templateUrl: './flight-enable.component.html',
  styleUrls: ['./flight-enable.component.scss'],
})
export class FlightEnableComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightApiService: FlightApiService,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group({
    crewUuid: ['', Validators.required],
    aircraftUuid: ['', Validators.required],
    flightNumber: ['', Validators.required],
    id: ['', Validators.required],
  });
  submitted = false;
  flight: any = null;
  crew = crews;
  aircrafts = aircrafts;

  ngOnInit(): void {
    this.route.params.subscribe((value: any) => {
      if (value.id) {
        this.form.patchValue({ id: value.id });
        this.getFlight(value.id);
      }
    });
  }

  async getFlight(flightId: number) {
    const response = await lastValueFrom(this.flightApiService.edit(flightId));
    this.flight = response[0];
  }

  generateCode() {
    const code = makeid(5);
    this.form.patchValue({
      flightNumber: code,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.enableFlight(this.form.value);
    }
  }

  async enableFlight(data: any) {
    data = { ...this.flight, ...data };
    const avaibleSeats = this.generateSeats();
    const tickets = this.generateTickets();
    data.startTime = '20220101';
    data.endTime = '20220101';
    data.status = 'active'
    data.information = { avaibleSeats, tickets: tickets };
    console.log("dataInformaiton",data.information)
    debugger
    const response = await lastValueFrom(
      this.flightApiService.bulkEnable({ data: [data] })
    );
    this.router.navigate([`flight/detail/${this.flight.id}`])
  }

  generateTickets() {
    let results = [];
    results.push({
      clase: 'turist',
      price: this.getRandomArbitrary(50, 200),
      quant: this.getRandomArbitrary(30, 100),
    });
    results.push({
      clase: 'first',
      price: this.getRandomArbitrary(150, 500),
      quant: this.getRandomArbitrary(5, 20),
    });
    return results
  }

  getRandomArbitrary(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

  generateSeats(): Seat[] {
    const rows = 14;
    const columns = 4;
    let seats: Seat[] = [];

    for (let indexRow = 1; indexRow <= rows; indexRow++) {
      for (let indexColumn = 1; indexColumn <= columns; indexColumn++) {
        if (indexRow >= 1 && indexRow < 6) {
          seats.push(
            this.generateAssistanceSeats(
              `${indexRow}_${indexColumn > 2 ? indexColumn + 2 : indexColumn}`
            )
          );
        }
        if (indexRow >= 6) {
          seats.push(
            this.generateEconomySeats(
              `${indexRow}_${indexColumn > 2 ? indexColumn + 2 : indexColumn}`
            )
          );
        }
      }
    }
    return seats;
  }

  generateAssistanceSeats(rowColumn: string): Seat {
    return {
      code: uuidv4(),
      type: 'ASSISTANCE',
      status: 'FREE',
      rowColumn: rowColumn,
    };
  }

  generateEconomySeats(rowColumn: string): Seat {
    return {
      code: uuidv4(),
      type: 'ECONOMY',
      status: 'FREE',
      rowColumn: rowColumn,
    };
  }
}
