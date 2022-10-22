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
import { FlightProgramPageComponent } from './pages/flight-program-page/flight-program-page.component';
import { FlightFormComponent } from './pages/flight-form/flight-form.component';
import { FlightAdminComponent } from './pages/flight-admin/flight-admin.component';
import { FlightEnableComponent } from './pages/flight-enable/flight-enable.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'flights', component: FlightsPageComponent},
  {path: 'passangers', component: PassangersPageComponent,canActivate: [AuthGuard]},
  {path: 'passangers/new', component: PassangerFormComponent,canActivate: [AuthGuard]},
  {path: 'flights/:flightId', component: FlightDetailComponent, canActivate: [AuthGuard]},
  {path: 'check-in/:flightId', component: CheckInComponent, canActivate: [AuthGuard]},
  {path: 'flight/admin', component: FlightAdminComponent},
  {path: 'flight/new', component: FlightFormComponent},
  {path: 'flight-programs/new', component: FlightProgramFormComponent},
  {path: 'flight-programs/edit/:id', component: FlightProgramFormComponent},
  {path: 'flight/enable/:id', component: FlightEnableComponent},
  {path: 'flight-programs', component: FlightProgramPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
