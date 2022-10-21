import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FlightProgramService } from 'src/app/api-http/flight-program/flight-program.service';
import { airportCodes } from 'src/app/utils/airport-codes';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-flight-program-page',
  templateUrl: './flight-program-page.component.html',
  styleUrls: ['./flight-program-page.component.scss'],
})
export class FlightProgramPageComponent implements OnInit {
  flightPrograms: any = [];
  loading = false;
  airportCodes: any = [];
  constructor(
    private flightProgramService: FlightProgramService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.getFlightPrograms();
    this.airportCodes = airportCodes.map((airportCode) => {
      return {
        label: airportCode,
        value: airportCode,
      };
    });
  }

  async getFlightPrograms() {
    this.loading = true;
    this.flightPrograms = await lastValueFrom(
      this.flightProgramService.getAll()
    );
    this.loading = false;
  }

  async onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: async () => {
        const response = await lastValueFrom(
          this.flightProgramService.delete(id)
        );

        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        this.getFlightPrograms();
      },
    });
  }
}
