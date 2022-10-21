import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Passanger} from "../../api-models";

@Injectable({
  providedIn: 'root'
})
export class PassangerService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Passanger[]>('http://localhost:3000/api/passanger');
  }

  post(body: Passanger) {
    return this.http.post<Passanger>('http://localhost:3000/api/passanger',
    body
    );
  }




}
