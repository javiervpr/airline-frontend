import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';
import {FlightsPageComponent} from "./pages/flights-page/flights-page.component";
import { PassangerFormComponent } from './pages/passanger-form/passanger-form.component';
import { PassangersPageComponent } from './pages/passangers-page/passangers-page.component';

const routes: Routes = [
  {path: '', component: FlightsPageComponent},
  {path: 'flights', component: FlightsPageComponent},
  {path: 'passangers', component: PassangersPageComponent},
  {path: 'passangers/new', component: PassangerFormComponent},
  {path: 'booking/new', component: BookingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
