import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KindTrip } from 'src/app/classes/KindTrip';
import { Trips } from 'src/app/classes/Trips';
import { KindTripService } from 'src/app/services/kind-trip.service';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-our-trips',
  templateUrl: './our-trips.component.html',
  styleUrls: ['./our-trips.component.css']
})
export class OurTripsComponent {
  

  constructor(public trip: TripsService, public kindTrip: KindTripService, public r: Router, public user: UsersService) {
    this.d1 = new Date()
  }
  ngOnInit(): void {
    debugger
    this.trip.getAll().subscribe(
      Data => {
        this.ListT = Data; console.log(Data); console.log(this.d1.toLocaleString);
      },
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
      Data => { this.ListTrip = Data; this.ListTripReplace = Data },
      Err => console.log(Err)
    )

  }
  //משווה בין תאריכים וממיר לאותו סוג
  compareDates(date1: Date, date2: Date): number {
    debugger
    const date3 = new Date(date1);
    if (date3 < date2) {
      return -1;
    } else if (date3 > date2) {
      return 1;
    } else {
      return 0;
    }
  }
  //בודק מי נמצא ברשימת הטיולים של המשתמש הנוכחי
  find(trip: Trips): number {
    for (let i = 0; i < this.ListTrip.length; i++) {
      if (this.ListTrip[i].code == trip.code)
        return 0;
    }
    return 1;
  }
  //משתני מחלקה
  showDiv: boolean = false;
  d1: Date;
  ListT: Array<Trips> = new Array<Trips>()
  ListTReplace: Array<Trips> = new Array<Trips>()
  ListTrip: Array<Trips> = new Array<Trips>()
  ListTripReplace: Array<Trips> = new Array<Trips>()
  //רשימת סוגי הטיולים מיובאת מהמסד
  list: Array<KindTrip> = new Array<KindTrip>();
  //סינון לפי סוג טיול
  onOptionSelected(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    let numericValue = Number(selectedOption);
    if (numericValue == 0) {
      this.ListT = this.ListTReplace
      this.ListTrip = this.ListTripReplace
    }
    else {
      this.ListT = this.ListTReplace.filter(x => x.codeKind == numericValue)
      this.ListTrip = this.ListTripReplace.filter(x => x.codeKind == numericValue)
    }
  }
  //ניתוב לטיול ספציפי
  move(code: number | undefined) {
    this.r.navigate([`speTrip/${code}`])
  }
}
