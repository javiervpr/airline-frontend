import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Passanger } from '../../api-models';
import { PassangerActions } from '../../state-management/actions';
import { getPassangerSelected } from '../../state-management/selectors';

@Component({
  selector: 'app-passanger-form',
  templateUrl: './passanger-form.component.html',
  styleUrls: ['./passanger-form.component.scss']
})
export class PassangerFormComponent implements OnInit {

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  
  passangerForm: Passanger = {
    id: '',
    name: '',
    lastName: '',
    passport:'',
    needsAssistance:false
  };


  save() {
    console.log(this.passangerForm)
    this.store.dispatch(PassangerActions.addPassanger({ newPassanger: this.passangerForm }));
    let apiStatus$ = this.store.pipe(select(getPassangerSelected));
    this.router.navigate(['/passangers']);
  }

}
