import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FlightBooking} from "../../api-models";

@Injectable({
  providedIn: 'root'
})
export class FlightBookingService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<FlightBooking[]>('http://54.165.101.228:3000/api/passanger');
  }

}
