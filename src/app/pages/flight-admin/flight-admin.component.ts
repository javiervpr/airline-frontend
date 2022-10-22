import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FlightApiService } from 'src/app/api-http/flight-program/flight-api.service';

@Component({
  selector: 'app-flight-admin',
  templateUrl: './flight-admin.component.html',
  styleUrls: ['./flight-admin.component.scss'],
})
export class FlightAdminComponent implements OnInit {
  flights: any = [];
  loading = false;
  constructor(private flightApiService: FlightApiService) {}

  ngOnInit(): void {
    this.getFlihgts()
  }

  async getFlihgts() {
    this.loading = true;
    this.flights = await lastValueFrom(this.flightApiService.getAll());
    this.loading = false;
    console.log(this.flights)
  }
}
