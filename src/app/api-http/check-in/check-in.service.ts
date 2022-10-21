import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, mergeMap, Observable} from "rxjs";
import {Baggage, CheckIn, Passenger, Seat} from "../../api-models";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCheckIn(flightId: string, passengerId: string): Observable<CheckIn> {
    return this.http.get<CheckIn>(`http://localhost:8082/checkIn/${flightId}/${passengerId}`);
  }

  createCheckIn(flightId: string, passengerId: string): Observable<CheckIn> {
    const body = {
      flightId,
      passanger: {
        id: passengerId
      }
    };
    return this.http.post<CheckIn>('http://localhost:8082/create-checkin', body);
  }

  assignSeat(flightId: string, seat: Seat, passengerId: string): Observable<Seat> {
    const body = {
      flightId,
      seat,
      passanger: {
        id: passengerId
      }
    };
    return this.http.post<Seat>(`http://localhost:8082/assign-seat`, body);
  }

  tagBaggage(flightId: string, baggages: Baggage[], passengerId: string): Observable<string> {
    const body = {
      flightId,
      baggages,
      passanger: {
        id: passengerId
      }
    }
    return this.http.post<string>('http://localhost:8082/tag-baggage', body);
  }

  assignSeatAndCreateCheckIn(flightId: string, seat: any, passengerId: string, create: boolean): Observable<Seat> {
    if (create)
      return this.assignSeat(flightId, seat, passengerId);

    return this.createCheckIn(flightId, passengerId).pipe(
      mergeMap(checkIn => this.assignSeat(flightId, seat, passengerId))
    );
  }

  tagBaggageAndCreateCheckIn(flightId: string, baggages: Baggage[], passengerId: string, create: boolean): Observable<string> {
    if (create)
      return this.tagBaggage(flightId, baggages, passengerId);

    return this.createCheckIn(flightId, passengerId).pipe(
      mergeMap(checkIn => this.tagBaggage(flightId, baggages, passengerId))
    );
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`http://localhost:8082/passenger`);
  }

  getSeatsByFlightId(flightId: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(`http://localhost:8082/seats/${flightId}`);
  }
}
