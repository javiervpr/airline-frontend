import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightApiService {
  constructor(private client: HttpClient) {}

  bulkInsert(data: any) {
    return this.client.post(`${environment.baseUrl}/api/flight/bulk`, data);
  }

  getAll() {
    return this.client.get(`${environment.baseUrl}/api/flight`);
  }

  edit(flightId: number) {
    return this.client.get<any>(
      `${environment.baseUrl}/api/flight?id=${flightId}`
    );
  }


  bulkEnable(data: any) {
    return this.client.post(`${environment.baseUrl}/api/flight/bulk_enable`, data);
  }
}
