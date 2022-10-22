import { Component, OnInit } from '@angular/core';
import { end } from '@popperjs/core';
import { lastValueFrom } from 'rxjs';
import { FlightProgramService } from 'src/app/api-http/flight-program/flight-program.service';
import { weekDays } from './utils';
import * as moment from 'moment-timezone';
import { FlightApiService } from 'src/app/api-http/flight-program/flight-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit {
  flightPrograms: any = [];
  flight = {
    startTime: '',
    daysDeparting: '',
    durationMinutes: '',
    flightProgramId: '',
    range: '',
  };
  weekDays = weekDays;
  submitted = false;

  constructor(
    private flightProgramService: FlightProgramService,
    private flightApiService: FlightApiService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getFlightPrograms();
  }

  async getFlightPrograms() {
    this.flightPrograms = await lastValueFrom(
      this.flightProgramService.getAll()
    );
  }

  onSubmit() {
    const result = [];
    const startDate = moment(this.flight.range[0]);
    const endDate = moment(this.flight.range[1]);
    const diffInDays = endDate.diff(startDate, 'days');
    let currentDate = startDate.clone();
    const hours = moment(this.flight.startTime).hours();
    const minutes = moment(this.flight.startTime).minutes();

    for (let i = 0; i < diffInDays; i++) {
      // add day to get the current date
      currentDate.add(1, 'days');
      const currentDay = currentDate.day();
      // check if current date is equal to one of the departure dates
      if (this.flight.daysDeparting.includes(currentDay.toString())) {
        let submitStartDate = currentDate.clone();
        submitStartDate.add(hours, 'hours');
        submitStartDate.add(minutes, 'minutes');
        // get the end date adding the hours
        let submitEndDate = submitStartDate.clone();
        submitEndDate.add(this.flight.durationMinutes, 'minutes');

        result.push({
          flightProgramId: this.flight.flightProgramId,
          scheduledStartTime: submitStartDate.format(),
          scheduledEndTime: submitEndDate.format(),
        });
      }
    }
    console.log(result)
    this.saveFlights(result);
  }

  async saveFlights(data: any) {
    const response = await lastValueFrom(
      this.flightApiService.bulkInsert({ data })
    );
    this.router.navigate(['/flights'])
  }
}
