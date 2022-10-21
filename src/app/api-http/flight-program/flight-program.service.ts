import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlightProgram} from "../../api-models";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlightProgramService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<FlightProgram[]>(`${environment.baseUrl}/api/flight_programs`);
  }

  get() {
    return this.http.get<FlightProgram[]>(`${environment.baseUrl}/api/flight`);
  }
}
