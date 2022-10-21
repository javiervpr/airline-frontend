import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StateManagementModule} from "./state-management/state-management.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassangersPageComponent } from './pages/passangers-page/passangers-page.component';
import { PassangerFormComponent } from './pages/passanger-form/passanger-form.component';
import { FlightProgramFormComponent } from './pages/flight-program-form/flight-program-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckInComponent } from './pages/check-in/check-in.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { LoginComponent } from './pages/login/login.component';
import {TokenInterceptorService} from "./api-http/auth/token-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    FlightsPageComponent,
    PassangersPageComponent,
    PassangerFormComponent,
    FlightProgramFormComponent,
    CheckInComponent,
    FlightDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StateManagementModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
