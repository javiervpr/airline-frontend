import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlightsPageComponent} from "./pages/flights-page/flights-page.component";
import {CheckInComponent} from "./pages/check-in/check-in.component";
import {FlightDetailComponent} from "./pages/flight-detail/flight-detail.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'flights', component: FlightsPageComponent, canActivate: [AuthGuard]},
  {path: 'flights/:flightId', component: FlightDetailComponent, canActivate: [AuthGuard]},
  {path: 'check-in/:flightId', component: CheckInComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
