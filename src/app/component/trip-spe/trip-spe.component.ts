import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/classes/Order';
import { Trips } from 'src/app/classes/Trips';
import { KindTripService } from 'src/app/services/kind-trip.service';
import { OrderService } from 'src/app/services/order.service';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trip-spe',
  templateUrl: './trip-spe.component.html',
  styleUrls: ['./trip-spe.component.css']
})
export class TripSpeComponent {



  constructor(public trip: TripsService, public kindTrip: KindTripService, public r: Router, public ar: ActivatedRoute, public cu: UsersService, public order2: OrderService) { }


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
    //כל ההזמנות
    this.order2.getAll().subscribe(
      Data => {
        this.listOrders = Data; //סינון של ההזמנה הרצויה
        console.log(Data);
        debugger
        this.myOrder = this.listOrders.find(x => x.codeUser == Number(this.cu.currentUser.codeUser) && x.codeTrip == code)
        //מחיקה של ההזמנה
        if (this.compareDates(this.myOrder?.dateTrip!) > new Date()) {
          this.order2.del((Number(this.myOrder?.code))).subscribe(
            Data => {
              this.bool2 = Data; if (this.bool2 == true) {
                this.trip.getByIdC(this.mytrip.code!).subscribe(
                  Data => { this.mytrip = Data; },
                  Err => console.log(Err)
                )
                this.cu.GetAllTripUser(Number(this.cu.currentUser.codeUser)).subscribe(
                  Data => { this.list = Data; },
                  Err => console.log(Err)
                )
                Swal.fire('Success!', 'הביטול התבצע בהצלחה', 'success');
              }
              else {
                Swal.fire('Error!', 'הביטול לא התבצע אנא נסה שוב', 'error');
              }
            },
            Err => console.log(Err)
          )
        }
        else {
          Swal.fire('Error!', 'הטיול כבר התבצע', 'error');
        }

      },
      Err => console.log(Err)
    )
  }
  order(code: number | undefined) {
    this.showDiv = !this.showDiv;
  }
  order22(code: number | undefined) {
    this.showDiv2 = !this.showDiv2;
  }
  close() {
    this.showDiv = !this.showDiv;
  }
  close2() {
    this.showDiv2 = !this.showDiv2;
  }
  save() {
    if (this.place <= 0) {
      Swal.fire('Oops...', 'מספר לא חוקי צריך לפחות 1', 'warning');
      return
    }
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
          Swal.fire('Success', 'ההזמנה בוצעה בהצלחה', 'success')
          this.showDiv = !this.showDiv;
          this.trip.getByIdC(this.mytrip.code!).subscribe(
            Data => { this.mytrip = Data; },
            Err => console.log(Err)
          )
          this.cu.GetAllTripUser(Number(this.cu.currentUser.codeUser)).subscribe(
            Data => { this.list = Data; },
            Err => console.log(Err)
          )
        }
        else {
          Swal.fire('Error', 'אין מספיק מקומות בטיול זה', 'error')
        }
      },
      Err => console.log(Err)
    )
  }

  save2() {
    if (this.place <= 0) {
      Swal.fire('Oops...', 'מספר לא חוקי צריך לפחות 1', 'warning');
      return
    }
    this.or.place = this.place
    this.or.codeTrip = this.mytrip.code
    this.or.codeUser = this.cu.currentUser.codeUser
    this.or.fullName = "aa"
    this.or.goal = "bb"
    this.or.date = new Date()
    this.or.dateTrip = new Date()
    debugger
    this.order2.update(this.or).subscribe(
      Data => {
        this.answer = Data;
        if (this.answer != -1 && this.answer != 0) {
          Swal.fire('Success!', 'העדכון נקלט בהצלחה', 'success');
          this.showDiv2 = !this.showDiv2;
          this.trip.getByIdC(this.mytrip.code!).subscribe(
            Data => { this.mytrip = Data; },
            Err => console.log(Err)
          )
        }
        else {
          Swal.fire('Oops...', 'אין מספיק מקומות פנויים בטיול זה', 'error');
        }
      },
      Err => console.log(Err)
    )
  }

  compareDates(date1: Date): Date {
    const date3 = new Date(date1);
    return date3
  }

  orderUser() {
    debugger
    this.order2.getAll().subscribe(
      Data => {
        this.listOrders = Data;
        this.myOrderUser = this.listOrders.find(x => x.codeUser == Number(this.cu.currentUser.codeUser) && x.codeTrip == this.mytrip.code)
        Swal.fire('ORDER:', `בפעם הקודמת הזמנת ${this.myOrderUser?.place} מקומות`, 'info')
      },
      Err => console.log(Err)
    )
  }
  //משתני מחלקה
  t: Date = new Date()
  or: Order = new Order()
  place: number = 1;
  answer: number = 0;
  showDiv: boolean = false;
  showDiv2: boolean = false;
  mytrip: Trips = new Trips();
  list: Array<Trips> = new Array<Trips>()
  listOrders: Array<Order> = new Array<Order>()
  myOrder: Order | undefined = new Order()
  bool2: boolean = false
  placeOrder: number = 0;
  myOrderUser: Order | undefined = new Order()
  x: number | undefined = 0
  d1: Date = new Date()

  // 

}
