import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FlightProgramService } from 'src/app/api-http/flight-program/flight-program.service';
import { airportCodes } from 'src/app/utils/airport-codes';

@Component({
  selector: 'app-flight-program-form',
  templateUrl: './flight-program-form.component.html',
  styleUrls: ['./flight-program-form.component.scss'],
})
export class FlightProgramFormComponent implements OnInit {
  flightProgramForm = this.formBuilder.group({
    sourceAirport: ['', Validators.required],
    destinyAirport: ['', Validators.required],
    flightCode: ['', Validators.required],
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private flightProgramsService: FlightProgramService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public get airportCodes(): string[] {
    return airportCodes;
  }

  async onCreateSubmit() {
    this.submitted = true;
    if (this.flightProgramForm.valid) {
      let data: any = this.flightProgramForm.value;
      data.itineraryId = 1;
      const respose = await lastValueFrom(
        this.flightProgramsService.create(data)
      );
      this.router.navigate(['flight-programs']);
    }
  }
}
