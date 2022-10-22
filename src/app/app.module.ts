import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateManagementModule } from './state-management/state-management.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassangersPageComponent } from './pages/passangers-page/passangers-page.component';
import { PassangerFormComponent } from './pages/passanger-form/passanger-form.component';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';
import { FlightProgramFormComponent } from './pages/flight-program-form/flight-program-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckInComponent } from './pages/check-in/check-in.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptorService } from './api-http/auth/token-interceptor.service';
import { FlightProgramPageComponent } from './pages/flight-program-page/flight-program-page.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FlightFormComponent } from './pages/flight-form/flight-form.component';
import { CalendarModule } from 'primeng/calendar';
import { FlightAdminComponent } from './pages/flight-admin/flight-admin.component';
import { FlightEnableComponent } from './pages/flight-enable/flight-enable.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsPageComponent,
    PassangersPageComponent,
    PassangerFormComponent,
    BookingFormComponent,
    FlightProgramFormComponent,
    CheckInComponent,
    FlightDetailComponent,
    LoginComponent,
    FlightProgramPageComponent,
    FlightFormComponent,
    FlightAdminComponent,
    FlightEnableComponent,
    FlightDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StateManagementModule,
    BrowserAnimationsModule,
    ButtonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MultiSelectModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
