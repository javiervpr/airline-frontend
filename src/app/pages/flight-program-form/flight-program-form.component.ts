import { Component, OnInit } from '@angular/core';
import { airportCodes } from 'src/app/utils/airport-codes';

@Component({
  selector: 'app-flight-program-form',
  templateUrl: './flight-program-form.component.html',
  styleUrls: ['./flight-program-form.component.scss']
})
export class FlightProgramFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public get airportCodes() : string[] {
    return airportCodes
  }


}
