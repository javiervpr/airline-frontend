import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../api-http/auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    user: new FormControl('flights_microservice', [Validators.required]),
    password: new FormControl('Lateral13$', [Validators.required]),
  });
  subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  login(): void {
    const authSub = this.authService.login(this.loginForm.value.user!, this.loginForm.value.password!).subscribe(
      result => {
          localStorage.setItem('IdToken', JSON.stringify(result));
          this.router.navigate(['flights']);
      }, err => console.log
    );
    this.subscriptions.add(authSub);
    console.log(this.loginForm.value.user, this.loginForm.value.password);
  }
}
