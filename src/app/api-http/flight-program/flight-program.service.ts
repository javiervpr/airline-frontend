import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FlightProgram } from '../../api-models';
import { environment } from '../../../environments/environment';
import { builEndpoint } from '../utils/utils';
import { flightProgramEndpoint } from '../utils/endpoints';

@Injectable({
  providedIn: 'root',
})
export class FlightProgramService {
  constructor(private http: HttpClient) {}

  flightProgramEndpoint = builEndpoint(flightProgramEndpoint);

  getAll() {
    return this.http.get<FlightProgram[]>(
      `${environment.baseUrl}/api/flight_program`
    );
  }

  get() {
    return this.http.get<FlightProgram[]>(`${environment.baseUrl}/api/flight`);
  }

  create(data: any) {
    return this.http.post<any>(this.flightProgramEndpoint, data);
  }

  delete(id: number) {
    const endpoint = `${this.flightProgramEndpoint}/${id}`;
    return this.http.delete<any>(endpoint);
  }

  edit(id: number) {
    let params = new HttpParams();
    params.append('flightProgramId', id);
    return this.http.get<any>(this.flightProgramEndpoint, { params: params });
  }

  update(data: any, id: number) {
    const endpoint = `${this.flightProgramEndpoint}/${id}`;
    return this.http.put<any>(endpoint, data);
  }
}
