import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KindTrip } from 'src/app/classes/KindTrip';
import { Trips } from 'src/app/classes/Trips';
import { KindTripService } from 'src/app/services/kind-trip.service';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-trips-manager',
  templateUrl: './trips-manager.component.html',
  styleUrls: ['./trips-manager.component.css']
})
export class TripsManagerComponent {

  d1 = new Date().getDate()

  constructor(public trip: TripsService, public kindTrip: KindTripService, public r: Router, public user: UsersService, public l: Location) {

  }
  ngOnInit(): void {
    this.trip.getAll().subscribe(
      Data => { this.ListT = Data; },
      Err => console.log(Err)
    )
    this.trip.getAll().subscribe(
      Data => { this.ListTReplace = Data; },
      Err => console.log(Err)
    )

    this.kindTrip.getAll().subscribe(
      Data => { this.list = Data; },
      Err => console.log(Err)
    )

    this.user.GetAllTripUser(Number(this.user.currentUser.codeUser)).subscribe(
      Data => { this.ListTrip = Data; },
      Err => console.log(Err)
    )

  }

  ListT: Array<Trips> = new Array<Trips>()
  ListTReplace: Array<Trips> = new Array<Trips>()
  ListTrip: Array<Trips> = new Array<Trips>()
  //רשימת סוגי הטיולים מיובאת מהמסד
  list: Array<KindTrip> = new Array<KindTrip>();
  showDiv: boolean = false
  onOptionSelected(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    let numericValue = Number(selectedOption);
    this.ListT = this.ListTReplace.filter(x => x.codeKind == numericValue)
  }
  move(code: number | undefined) {
    this.r.navigate([`speTrip/${code}`])

  }
  addTrip() {
    this.showDiv != this.showDiv
    this.r.navigate([`./ourTripsManager/addTrip`])
    this.showDiv != this.showDiv
  }
  close() {
    this.l.back()
  }
}
