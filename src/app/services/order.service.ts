import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public h: HttpClient) { }

  basisUrl: string = "https://localhost:7088/api/Order/"

  getAll(): Observable<Array<Order>> {
    debugger
    return this.h.get<Array<Order>>(`${this.basisUrl}GetAllOrders`)
  }
  GetAllToTrip(code: number): Observable<Array<Order>> {
    return this.h.get<Array<Order>>(`${this.basisUrl}GetAllToTrip/${code}`)
  }
  del(code: number): Observable<boolean> {
    return this.h.delete<boolean>(`${this.basisUrl}DeleteTrip/${code}`)
  }
  add(f: Order): Observable<number> {
    return this.h.post<number>(`${this.basisUrl}AddTrip`, f)
  }
  update(f: Order): Observable<number> {
    debugger
    return this.h.put<number>(`${this.basisUrl}UpdateOrder`, f)
  }
}
