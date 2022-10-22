import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FlightProgramService } from 'src/app/api-http/flight-program/flight-program.service';
import { FlightApiService } from 'src/app/api-http/flight/flight-api.service';
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
    itineraryId:['']
  });
  submitted = false;
  flightProgramId = null;
  itineraries:any = []

  constructor(
    private formBuilder: FormBuilder,
    private flightProgramsService: FlightProgramService,
    private flightApiService:FlightApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getItineraries()
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

  async getItineraries(){
    this.itineraries = await lastValueFrom( this.flightApiService.getItineraries())
  }

  async onCreateSubmit() {
    this.submitted = true;
    if (this.flightProgramForm.valid) {
      let data: any = this.flightProgramForm.value;
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

  public generateCode() {
    const airlines = ['BOA', 'AMAZ', 'LATAM', 'COPA'];
    const prefix = airlines[this.getRandomInt(airlines.length - 1)];
    const code =
      prefix +
      this.getRandomInt(9) +
      this.getRandomInt(9) +
      this.getRandomInt(9);
    this.flightProgramForm.patchValue({ flightCode: code });
  }

  getRandomInt(max:any) {
    return Math.floor(Math.random() * max);
  }

  async update(id: any, data: any) {
    await lastValueFrom(this.flightProgramsService.update(id, data));
    this.router.navigate(['flight-programs']);
  }
}
