import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlightsPageComponent} from "./pages/flights-page/flights-page.component";

const routes: Routes = [
  {path: '', component: FlightsPageComponent},
  {path: 'flights', component: FlightsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
