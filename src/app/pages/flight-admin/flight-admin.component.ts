import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FlightApiService } from 'src/app/api-http/flight/flight-api.service';

@Component({
  selector: 'app-flight-admin',
  templateUrl: './flight-admin.component.html',
  styleUrls: ['./flight-admin.component.scss'],
})
export class FlightAdminComponent implements OnInit {
  flights: any = [];
  loading = false;
  constructor(private flightApiService: FlightApiService,private router:Router) {}

  ngOnInit(): void {
    this.getFlihgts()
  }

  async getFlihgts() {
    this.loading = true;
    this.flights = await lastValueFrom(this.flightApiService.getAll());
    this.loading = false;
  }

  enableFlight(flightId: number) {
    this.router.navigate([`flight/enable/${flightId}`]);
  }
}
