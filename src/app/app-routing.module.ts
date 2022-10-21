import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightProgramFormComponent } from './pages/flight-program-form/flight-program-form.component';
import {FlightsPageComponent} from "./pages/flights-page/flights-page.component";
import { PassangerFormComponent } from './pages/passanger-form/passanger-form.component';
import { PassangersPageComponent } from './pages/passangers-page/passangers-page.component';
import {CheckInComponent} from "./pages/check-in/check-in.component";
import {FlightDetailComponent} from "./pages/flight-detail/flight-detail.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'flights', component: FlightsPageComponent},
  {path: 'passangers', component: PassangersPageComponent,canActivate: [AuthGuard]},
  {path: 'passangers/new', component: PassangerFormComponent,canActivate: [AuthGuard]},
  {path: 'flights/:flightId', component: FlightDetailComponent, canActivate: [AuthGuard]},
  {path: 'check-in/:flightId', component: CheckInComponent, canActivate: [AuthGuard]},
  {path: 'flight-programs/new', component: FlightProgramFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
