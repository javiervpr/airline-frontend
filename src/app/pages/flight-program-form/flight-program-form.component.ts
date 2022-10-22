import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    id: [''],
  });
  submitted = false;
  flightProgramId = null;

  constructor(
    private formBuilder: FormBuilder,
    private flightProgramsService: FlightProgramService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value: any) => {
      if (value.id) {
        this.flightProgramId = value.id;
        this.fetchFlightProgram(value.id);
      }
    });
  }

  public get airportCodes(): string[] {
    return airportCodes;
  }

  async fetchFlightProgram(id: number) {
    const response = await lastValueFrom(this.flightProgramsService.edit(id));
    if (response && response[0]) {
      this.flightProgramForm.patchValue(response[0]);
    } else {
      this.flightProgramId = null;
    }
  }

  async onCreateSubmit() {
    this.submitted = true;
    if (this.flightProgramForm.valid) {
      let data: any = this.flightProgramForm.value;
      data.itineraryId = 1;
      if (data.id) {
        const id = data.id;
        delete data.id;
        this.update(id, data);
      }

      const respose = await lastValueFrom(
        this.flightProgramsService.create(data)
      );
      this.router.navigate(['flight-programs']);
    }
  }

  async update(id: any, data: any) {
    await lastValueFrom(this.flightProgramsService.update(id, data));
    this.router.navigate(['flight-programs']);
  }
}
