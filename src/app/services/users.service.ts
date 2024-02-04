import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../classes/Users';
import { Trips } from '../classes/Trips';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public h: HttpClient) {

  }
  currentUser: Users = new Users();

  basisUrl: string = "https://localhost:7088/api/User/"

  getAll(): Observable<Array<Users>> {
    return this.h.get<Array<Users>>(`${this.basisUrl}GetAllUsers`)
  }
  GetAllTripUser(code: number): Observable<Array<Trips>> {
    return this.h.get<Array<Trips>>(`${this.basisUrl}GetAllTripUser/${code}`)
  }
  GetUser(email: string, password: string): Observable<Users> {
    return this.h.get<Users>(`${this.basisUrl}GetUser/${email}/${password}`)
  }
  del(code: number) {
    return this.h.delete<boolean>(`${this.basisUrl}DeleteUser/${code}`)
  }
  add(f: Users): Observable<number> {
    return this.h.post<number>(`${this.basisUrl}PostUser`, f)
  }
  update(f: Users): Observable<number> {
    return this.h.put<number>(`${this.basisUrl}PatchUser`, f)
  }

  getManager(): Observable<Array<Users>> {
    return this.h.get<Array<Users>>(`${this.basisUrl}GetManager`)
  }
}
