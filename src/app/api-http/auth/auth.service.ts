import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtResponse} from "../../api-models";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  login(user: string, password: string): Observable<JwtResponse> {
    const body = {
      "username": user,
      "password": password
    };
    return this.http.post<JwtResponse>( `${environment.baseUrl}/login`, body);
  }
}
