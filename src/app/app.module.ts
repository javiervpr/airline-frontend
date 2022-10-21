import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StateManagementModule} from "./state-management/state-management.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { PassangersPageComponent } from './pages/passangers-page/passangers-page.component';
import { PassangerFormComponent } from './pages/passanger-form/passanger-form.component';
import { FormsModule } from '@angular/forms';
import { FlightProgramFormComponent } from './pages/flight-program-form/flight-program-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsPageComponent,
    PassangersPageComponent,
    PassangerFormComponent,
    FlightProgramFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StateManagementModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
