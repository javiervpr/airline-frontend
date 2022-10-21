import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlightProgram} from "../../api-models";
import { buildEndpoint } from '../helpers/util';
import { getFlightProgramsEndpoint } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class FlightProgramService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    const endpoint = buildEndpoint(getFlightProgramsEndpoint)
    return this.http.get<FlightProgram[]>(endpoint);
  }
}
