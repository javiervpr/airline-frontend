import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { loginEndpoint } from '../endpoints';
import { buildEndpoint } from '../helpers/util';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private client: HttpClient) {}

  login(data: any) {
    const endpoint = buildEndpoint(loginEndpoint);
    return this.client.post<any>(endpoint, data).pipe(
      tap((response: any)=>{
        if(response.IdToken){
          sessionStorage.setItem("idToken",response.IdToken)
        }
      })
    )
  }
}
