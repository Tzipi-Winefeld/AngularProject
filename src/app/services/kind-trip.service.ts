import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KindTrip } from '../classes/KindTrip';

@Injectable({
  providedIn: 'root'
})
export class KindTripService {

  constructor(public h:HttpClient) {

   }

  basisUrl:string="https://localhost:7088/api/KindTrip/"
  
  getAll():Observable<Array<KindTrip>>{
    return this.h.get<Array<KindTrip>>(`${this.basisUrl}GetAllKindTrips`)
  }
  del(code:number){
    return this.h.delete<boolean>(`${this.basisUrl}DeleteKindTrip/${code}`)
  }
  add(k:KindTrip)
  {
    //body משתנה הנשלח ב
    // נוסיף פסיק ושם המשתנה
    return this.h.post<number>(`${this.basisUrl}AddKindTrip`,k)
  }
}
