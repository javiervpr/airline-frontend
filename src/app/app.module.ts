import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StateManagementModule} from "./state-management/state-management.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StateManagementModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
