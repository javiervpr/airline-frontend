import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BookingService } from '../../api-http/booking/booking.service';
import { FlightBooking, FlightProgram, Passanger } from '../../api-models';
import { Booking } from '../../api-models/booking';
import { FlightBookingActions } from '../../state-management/actions';
import { getPassangers } from '../../state-management/selectors';
import { getFlightBookings } from '../../state-management/selectors/flight-booking.selector';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  flightBookings: FlightBooking[] = [];
  passangers: Passanger[] = [];
  // concat = Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10);

  booking: Booking = {
    reservationNumber:Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10)+''+Math.floor(Math.random() * 10),
    passanger:'',
    flight:'',
    reservationStatus:'open',
    date:'',
    value: 200
  };

  constructor(
    private readonly store: Store,
    private bookingService: BookingService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.store.select(getFlightBookings)
    .subscribe(
    flightBookings => {this.flightBookings = flightBookings
    console.log(`flightBookings: ${JSON.stringify(flightBookings)}`)
    }
  );
  this.store.select(getPassangers)
  .subscribe(
  passangers => this.passangers = passangers
  );  
  }

  save() {
    this.booking.date = (new Date().toJSON())
    // this.bookingService.post(this.booking).pipe(
    //   map((data) => {
    //     console.log(data)
    //   }))
    console.log(JSON.stringify(this.booking))
      this.http.post<Booking>('http://54.165.101.228:3000/api/booking',
      this.booking
      ).subscribe(
        (response)=>{
          console.log(response)
        },
        (error)=>{
          console.log(error)
        }
      )
    
  }


}
