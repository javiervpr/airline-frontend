import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {getPassangers} from "../../state-management/selectors";
import {Passanger} from "../../api-models";

@Component({
  selector: 'app-passangers-page',
  templateUrl: './passangers-page.component.html',
  styleUrls: ['./passangers-page.component.scss']
})
export class PassangersPageComponent implements OnInit {

  passangers: Passanger[] = [];

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(getPassangers)
    .subscribe(
    passangers => this.passangers = passangers
  );
  }

}
