import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginApiService } from 'src/app/api-http/login/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submitted = false;
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private loginApiService: LoginApiService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  async onLoginFormSubmit() {
    this.errorMessage = ""
    this.submitted = true;
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      const response = await lastValueFrom(this.loginApiService.login(data));
      if(response.AccessToken){
        this.router.navigate(["/"])
      }else{
          this.errorMessage = response.message
      }
    }
  }
}
