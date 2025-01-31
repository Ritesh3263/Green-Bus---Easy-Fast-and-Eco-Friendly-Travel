import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = 'https://web-api-custom.onrender.com/api';
  
  constructor(private http: HttpClient) {  }

  // Example: Fetch all Locations
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl + '/locations'}`);
  }

  searchBus(from: string, to: string, travelDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl + `/searchBus?from=${from}&to=${to}&date=${travelDate}`}`);
  }

  getBusByScheduleId(scheduleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl + `/bus/${scheduleId}`}`);
  }


}
