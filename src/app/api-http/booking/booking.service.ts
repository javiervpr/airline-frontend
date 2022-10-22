import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Booking} from "../../api-models";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Booking[]>('http://54.165.101.228:3000/api/booking');
  }

  post(body: Booking) {
    console.log(JSON.stringify(body))
    return this.http.post<Booking>('http://54.165.101.228:3000/api/booking',
    body
    );
  }

}
