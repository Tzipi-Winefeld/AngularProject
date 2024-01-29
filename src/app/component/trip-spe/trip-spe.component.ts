import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/classes/Order';
import { Trips } from 'src/app/classes/Trips';
import { KindTripService } from 'src/app/services/kind-trip.service';
import { OrderService } from 'src/app/services/order.service';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-trip-spe',
  templateUrl: './trip-spe.component.html',
  styleUrls: ['./trip-spe.component.css']
})
export class TripSpeComponent {

  constructor(public trip: TripsService, public kindTrip: KindTripService, public r: Router, public ar: ActivatedRoute, public cu: UsersService, public order2: OrderService) { }
  x: number | undefined = 0

  ngOnInit(): void {
    const code = this.ar.snapshot.params['code'];
    this.trip.getByIdC(code).subscribe(
      Data => { this.mytrip = Data; },
      Err => console.log(Err)
    )

    this.cu.GetAllTripUser(Number(this.cu.currentUser.codeUser)).subscribe(
      Data => { this.list = Data; },
      Err => console.log(Err)
    )

  }
  find(trip: Trips): number {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].code == trip.code)
        return 0;
    }
    return 1;
  }
  delete(code: number | undefined) {
    debugger
    //כל ההזמנות
    this.order2.getAll().subscribe(
      Data => {
        this.listOrders = Data; //סינון של ההזמנה הרצויה
        console.log(Data);
        debugger
        this.myOrder = this.listOrders.find(x => x.codeUser == Number(this.cu.currentUser.codeUser) && x.codeTrip == code)
        //מחיקה של ההזמנה
        this.order2.del((Number(this.myOrder?.code))).subscribe(
          Data => {
            this.bool2 = Data; if (this.bool2 == true) {
              alert("ההסרה בוצעה בהצלחה")
            }
            else {
              alert("הביטול לא התבצע בהצלחה")
            }
          },
          Err => console.log(Err)
        )
      },
      Err => console.log(Err)
    )
  }
  order(code: number | undefined) {
    this.showDiv = !this.showDiv;
  }
  close() {
    this.showDiv = !this.showDiv;
  }
  save() {
    this.or.place = this.place
    this.or.codeTrip = this.mytrip.code
    this.or.codeUser = this.cu.currentUser.codeUser
    this.or.fullName = "aa"
    this.or.goal = "bb"
    this.or.date = new Date()
    this.or.dateTrip = new Date()
    debugger
    this.order2.add(this.or).subscribe(
      Data => {
        this.answer = Data;
        if (this.answer != -1 && this.answer != 0) {
          alert("ההזמנה בוצעה בהצלחה")
          this.showDiv = !this.showDiv;
        }
        else {
          alert("אין מספיק מקומות פנויים בטיול זה")
        }
      },
      Err => console.log("noooooooooooooo")
    )
  }
  t: Date = new Date()
  or: Order = new Order()
  place: number = 0;
  answer: number = 0;
  showDiv: boolean = false;
  mytrip: Trips = new Trips();
  list: Array<Trips> = new Array<Trips>()
  listOrders: Array<Order> = new Array<Order>()
  myOrder: Order | undefined = new Order()
  bool2: boolean = false

  // 

}
