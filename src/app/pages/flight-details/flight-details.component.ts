import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FlightApiService } from 'src/app/api-http/flight/flight-api.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private flightApiService: FlightApiService
  ) {}

  flight: any;

  ngOnInit(): void {
    this.route.params.subscribe((value: any) => {
      if (value.id) {
        this.getFlight(value.id);
      }
    });
  }

  async getFlight(flightId: number) {
    const response = await lastValueFrom(this.flightApiService.edit(flightId));
    this.flight = response[0];
  }
}
