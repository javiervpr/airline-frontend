import {Component, OnInit} from '@angular/core';
import {Baggage, CheckIn, FlightProgram, Passenger, Seat} from "../../api-models";
import {filter, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getFlightProgramSelected} from "../../state-management/selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckInService} from "../../api-http/check-in/check-in.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  flightProgram?: FlightProgram;
  subscriptions = new Subscription();
  seatConfig: any = null;
  seatmap: any[] = [];
  seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  cart: any = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };

  seatObjectSelected?: any;
  title = "seat-chart-generator";
  baggages: Baggage[] = [];

  baggageForm = new FormGroup({
    weight: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),
  });
  passengerForm = new FormGroup({
    passenger: new FormControl('', [Validators.required]),
  });
  seatForm = new FormGroup({
    seat: new FormControl('', [Validators.required]),
  });

  checkIn?: CheckIn;
  passengers: Passenger[] = [];
  flightId = '';
  availableSeats: Seat[] = [];

  constructor(
    private readonly store: Store,
    private checkInService: CheckInService,
    private route: ActivatedRoute
  ) {
  }

  getPassengers(flightId: string): void {
    this.checkInService.getPassengersCompletePay(flightId).subscribe(
      passengers => this.passengers = passengers,
      error => console.log
    );
  }

  getSeatsByFlifhtId(flightId: string): void {
    this.checkInService.getSeatsByFlightId(this.flightId).subscribe(
      seats => {
        this.availableSeats = seats;
        this.blockSeats();
      },
      error => console.log
    );
  }

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('flightId')!;
    this.getSeatsByFlifhtId(this.flightId);
    this.getPassengers(this.flightId);

    const flightSubscription = this.store.select(getFlightProgramSelected)
      .pipe(filter(flightProgram => !!flightProgram))
      .subscribe(flightProgram => {
        this.flightProgram = flightProgram!;

        this.seatConfig = [
          {
            seat_price: 250,
            seat_map: [
              {
                seat_label: "1",
                layout: "gg__gg"
              },
              {
                seat_label: "2",
                layout: "gg__gg"
              },
              {
                seat_label: "3",
                layout: "gg__gg"
              },
              {
                seat_label: "4",
                layout: "gg__gg"
              },
              {
                seat_label: "5",
                layout: "gg__gg"
              },
              {
                seat_label: "6",
                layout: "gg__gg"
              },
              {
                seat_label: "7",
                layout: "gg__gg"
              },
              {
                seat_label: "8",
                layout: "gg__gg"
              },
              {
                seat_label: "9",
                layout: "gg__gg"
              },
              {
                seat_label: "10",
                layout: "gg__gg"
              },
              {
                seat_label: "11",
                layout: "gg__gg"
              },
              {
                seat_label: "12",
                layout: "gg__gg"
              },
              {
                seat_label: "13",
                layout: "gg__gg"
              },
              {
                seat_label: "14",
                layout: "gg__gg"
              },
            ]
          }
        ];
        this.processSeatChart(this.seatConfig);
        this.blockSeats();
      });

    this.subscriptions.add(flightSubscription);


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  existCheckIn(): boolean {
    return !(this.checkIn == null || this.checkIn.checkInId == null || this.checkIn.checkInId === '');
  }

  addBaggage() {
    const baggage = {weight: Number(this.baggageForm.value.weight!)};
    this.baggages.push(baggage);
    const create = this.existCheckIn();
    this.checkInService
      .tagBaggageAndCreateCheckIn(this.flightId, [baggage], this.passengerForm.value.passenger!, create)
      .subscribe(result => {
          console.log(result);
          if (!result)
            alert('Try again please!');
        },
        error => console.log);
    this.baggageForm.reset();
  }


  assignSeat() {
    const create = this.existCheckIn();
    let seat = this.availableSeats
      .filter(seat => seat.rowColumn === this.seatObjectSelected.key);
    if (!seat || seat!.length == 0)
      return;
    this.checkInService
      .assignSeatAndCreateCheckIn(this.flightId, seat![0], this.passengerForm.value.passenger!, create)
      .subscribe(result => {
          console.log(result);
          if (!result) {
            alert('Try again please!');
          } else {
            alert('Seat saved');
          }
        },
        error => console.log);

  }

  selectPassenger() {
    console.log(this.passengerForm.value);
    this.seatForm.reset();
    this.getSeatsByFlifhtId(this.flightId);
    this.checkInService.getCheckIn(this.flightId, this.passengerForm.value.passenger!)
      .subscribe(checkIn => {

        if (checkIn.checkInId == null) {
          if (this.checkIn != null && this.checkIn.checkInId != null)
            this.checkIn.checkInId = '';

          this.baggages = [];
          if (this.seatObjectSelected && this.seatObjectSelected.status) {
            this.seatObjectSelected.status = "FREE";
            this.cleanSelectedSeat(this.seatObjectSelected.key);
          }

          const seatLabelText = (this.seatObjectSelected == null || false) ? '' : this.seatObjectSelected.seatLabel;
          const seatIndex = this.cart.selectedSeats.indexOf(seatLabelText);
          if (seatIndex > -1) {
            this.cart.selectedSeats.splice(seatIndex, 1);
            this.cart.seatstoStore.splice(seatIndex, 1);
          }
          this.blockSeats();
          return;
        }

        this.checkIn = checkIn;
        this.baggages = checkIn.baggages;
        if (this.seatObjectSelected)
          this.cleanSelectedSeat(this.seatObjectSelected.key);

        this.blockSeats();
        this.setBookedSeat(checkIn.seat.rowColumn);
        this.seatObjectSelected = undefined;

      }, error => console.log);
  }

  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        item_map.forEach((map_element: any) => {
          var mapObj: any = {
            seatRowLabel: map_element.seat_label,
            seats: [],
            seatPricingInformation: row_label
          };
          row_label = "";
          var seatValArr = map_element.layout.split("");
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1;
          }
          var totalItemCounter = 1;
          seatValArr.forEach((item: any) => {
            var seatObj: any = {
              key: map_element.seat_label + "_" + totalItemCounter,
              price: map_data[__counter]["seat_price"],
              status: "FREE"
            };

            if (item != "_") {
              seatObj["seatLabel"] =
                map_element.seat_label + " " + seatNoCounter;
              if (seatNoCounter < 10) {
                seatObj["seatNo"] = "0" + seatNoCounter;
              } else {
                seatObj["seatNo"] = "" + seatNoCounter;
              }

              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          console.log(" \n\n\n Seat Objects ", mapObj);
          this.seatmap.push(mapObj);
        });
      }
    }
  }

  public selectSeat(seatObject: any) {
    const passengerId = this.passengerForm.value.passenger;
    if (passengerId) {
      const passenger = this.passengers.find(p => p.id == passengerId);
      if (passenger && !passenger.needAssistance && Number(seatObject.seatNo) <= 20) {
        alert('This passenger does not need assistance');
        return;
      }
    }
    if (seatObject.status == "FREE") {
      seatObject.status = "BOOKED";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
      this.seatForm.setValue({seat: seatObject.seatNo});

      if (this.seatObjectSelected && this.seatObjectSelected !== seatObject) {
        this.seatObjectSelected.status = "FREE";
        var seatIndex = this.cart.selectedSeats.indexOf(this.seatObjectSelected.seatLabel);
        if (seatIndex > -1) {
          this.cart.selectedSeats.splice(seatIndex, 1);
          this.cart.seatstoStore.splice(seatIndex, 1);
          this.cart.totalamount -= seatObject.price;
        }
      }
      this.seatObjectSelected = seatObject;
    } else if ((seatObject.status = "BOOKED")) {
      seatObject.status = "FREE";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
      this.seatForm.reset();
    }
  }

  public blockSeats() {
    const seatsToBlock = this.availableSeats
      .filter(seat => seat.rowColumn && seat.status === 'BOOKED')
      .map(seat => seat.rowColumn)
      .join(",");
    if (seatsToBlock != "") {
      const seatsToBlockArr = seatsToBlock!.split(",");
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        const seat = seatsToBlockArr[index] + "";
        const seatSplitArr = seat.split("_");
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][
              parseInt(seatSplitArr[1]) - 1
                ] = seatObj;
              break;
            }
          }
        }
      }
    }
  }

  public setBookedSeat(seatsToBook: string) {
    if (seatsToBook != null && seatsToBook != "") {
      const seatsToBlockArr = seatsToBook!.split(",");
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        const seat = seatsToBlockArr[index] + "";
        const seatSplitArr = seat.split("_");
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "BOOKED";
              this.seatmap[index2]["seats"][
              parseInt(seatSplitArr[1]) - 1
                ] = seatObj;
              this.seatObjectSelected = seatObj;
              break;
            }
          }
        }
      }
    }
  }

  public cleanSelectedSeat(seatsToBook: string) {
    if (seatsToBook != null && seatsToBook != "") {
      const seatsToBlockArr = seatsToBook!.split(",");
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        const seat = seatsToBlockArr[index] + "";
        const seatSplitArr = seat.split("_");
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "FREE";
              this.seatmap[index2]["seats"][
              parseInt(seatSplitArr[1]) - 1
                ] = seatObj;
              this.seatObjectSelected = seatObj;
              break;
            }
          }
        }
      }
    }
  }

}
