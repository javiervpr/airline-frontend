import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { FlightApiService } from 'src/app/api-http/flight/flight-api.service';
import { FlightProgram } from 'src/app/api-models';
import { FlightProgramActions } from 'src/app/state-management/actions';

@Component({
  selector: 'app-flight-admin',
  templateUrl: './flight-admin.component.html',
  styleUrls: ['./flight-admin.component.scss'],
})
export class FlightAdminComponent implements OnInit {
  flights: any = [];
  loading = false;
  constructor(
    private flightApiService: FlightApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService:MessageService,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.getFlihgts();
  }

  async getFlihgts() {
    this.loading = true;
    this.flights = await lastValueFrom(this.flightApiService.getAll());
    this.loading = false;
  }

  enableFlight(flightId: number) {
    this.router.navigate([`flight/enable/${flightId}`]);
  }

  cancelFlight(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: async () => {
        const response = await lastValueFrom(
          this.flightApiService.cancel(id)
        );

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Flight Program Created',
          life: 3000,
        });
        this.getFlihgts();
      },
    });
  }

  openDetails(flightProgram: any) {
    this.store.dispatch(FlightProgramActions.selectFlightProgram(flightProgram));
    this.router.navigate([`flight/detail/${flightProgram.id}`])
  }
}
