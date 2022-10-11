import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlightProgram} from "../../api-models";

@Injectable({
  providedIn: 'root'
})
export class FlightProgramService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    console.log('getalllll'
    );
    return this.http.get<FlightProgram[]>('http://137.184.195.26/api/flight_programs');
  }
}
