import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FlightProgramService } from 'src/app/api-http/flight-program/flight-program.service';

@Component({
  selector: 'app-flight-program-page',
  templateUrl: './flight-program-page.component.html',
  styleUrls: ['./flight-program-page.component.scss'],
})
export class FlightProgramPageComponent implements OnInit {
  flightPrograms: any = [];
  constructor(private flightProgramService: FlightProgramService) {}

  ngOnInit(): void {
    this.getFlightPrograms()
  }

  async getFlightPrograms() {
    this.flightPrograms = await lastValueFrom(
      this.flightProgramService.getAll()
    );
  }
}
