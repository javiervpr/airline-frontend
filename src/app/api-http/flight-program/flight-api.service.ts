import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {

  constructor(private client: HttpClient) {
   }

   bulkInsert(data:any){
    return this.client.post(`${environment.baseUrl}/api/flight/bulk`,data)
   }

   getAll(){
    return this.client.get(`${environment.baseUrl}/api/flight`)
   }
}
