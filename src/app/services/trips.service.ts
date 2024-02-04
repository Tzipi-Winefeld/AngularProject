import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trips } from '../classes/Trips';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {


  constructor(public h: HttpClient) { }
  basisUrl: string = "https://localhost:7088/api/Trips/"

  getByIdC(code: number): Observable<Trips> {
    return this.h.get<Trips>(`${this.basisUrl}GetTripById/${code}`)
  }
  getAll(): Observable<Array<Trips>> {
    return this.h.get<Array<Trips>>(`${this.basisUrl}GetAllTrips`)
  }
  del(id: number) {
    return this.h.delete<boolean>(`${this.basisUrl}DeleteTrip/${id}`)
  }
  add(f: Trips) {
    return this.h.post<number>(`${this.basisUrl}AddTrip`, f)
  }
}
