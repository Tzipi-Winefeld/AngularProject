import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KindTrip } from 'src/app/classes/KindTrip';
import { Order } from 'src/app/classes/Order';
import { Trips } from 'src/app/classes/Trips';
import { Users } from 'src/app/classes/Users';
import { KindTripService } from 'src/app/services/kind-trip.service';
import { OrderService } from 'src/app/services/order.service';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  constructor(public pUser: UsersService, public r: Router, public trip: TripsService, public kind: KindTripService, public or: OrderService) { }
  ngOnInit(): void {
    this.newUser = this.pUser.currentUser

    this.pUser.GetAllTripUser(Number(this.pUser.currentUser.codeUser)).subscribe(
      Data => { this.listTrip = Data; this.ListTReplace = Data },
      Err => console.log(Err)
    )

    this.kind.getAll().subscribe(
      Data => { this.list = Data; },
      Err => console.log(Err)
    )
  }
  code: number = 0
  bool: boolean = false
  bool2: boolean = false
  d1: Date = new Date()
  save() {
    debugger
    console.log(this.newUser);
    this.pUser.update(this.newUser).subscribe(
      Data => {
        this.code = Data;
        if (this.code > 0) {
          Swal.fire('Success!', 'עודכן בהצלחה', 'success')
        }
        else {
          Swal.fire('Error!', 'העדכון לא התבצע אנא נסה שוב', 'error');
        }
      },
      Err => console.log(Err)
    )
  }
  move(code: number | undefined) {
    this.r.navigate([`speTrip/${code}`])
  }
  delete(code: number | undefined) {
    //כל ההזמנות
    this.or.getAll().subscribe(
      Data => {
        this.listOrders = Data;//סינון של ההזמנה הרצויה
        this.order = this.listOrders.find(x => x.codeUser == Number(this.pUser.currentUser.codeUser) && x.codeTrip == code)
        //מחיקה של ההזמנה
        if (this.compareDates(this.order?.dateTrip!) > new Date()) {
          this.or.del((Number(this.order?.code))).subscribe(
            Data => {
              this.bool2 = Data;
              if (this.bool2 == true) {
                this.pUser.GetAllTripUser(Number(this.pUser.currentUser.codeUser)).subscribe(
                  Data => { this.listTrip = Data; this.ListTReplace = Data },
                  Err => console.log(Err)
                )
                Swal.fire('Success!', 'ביטול הטיול התבצע בהצלחה', 'success')
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
  mydelete() {
    debugger

    this.pUser.GetAllTripUser((Number(this.pUser.currentUser.codeUser))).subscribe(
      Data => {
        this.tripUser = Data;
        for (let i = 0; i < this.tripUser.length; i++) {
          if (this.compareDates(this.tripUser[i].date!) > new Date()) {
            Swal.fire('Error!', 'יש לך טיולים עתידיים שאתה רשום אליהם אנא בטל אותם קודם', 'error');
            return
          }
        }
        this.or.getAll().subscribe(
          Data => {
            this.listOrders = Data;
            debugger
            for (let i = 0; i < this.listOrders.length; i++) {
              if (this.listOrders[i].codeUser == this.pUser.currentUser.codeUser) {
                debugger
                this.or.del((Number(this.order?.code))).subscribe(
                  succ => {
                    this.bool2 = succ;
                  },
                  Err => console.log(Err)
                )
              }
            }
            this.pUser.del((Number(this.pUser.currentUser.codeUser))).subscribe(
              Data => {
                this.bool = Data; if (this.bool == true) {
                  Swal.fire('Success!', 'ההזמנה נקלטה בהצלחה', 'success');
                }
                else {
                  Swal.fire('Oops...', 'יש לך טיולים עתידיים שאתה רשום אליהם אנא בטל אותם קודם', 'error');
                }
              },
              Err => console.log(Err)
            )
          },
          Err => console.log(Err)
        )
      },
      Err => console.log(Err)
    )
  }
  past() {
    this.listTrip = this.ListTReplace.filter(x => this.compareDates(x.date!) < this.d1)
  }

  future() {
    this.listTrip = this.ListTReplace.filter(x => this.compareDates(x.date!) > this.d1)
  }
  filterPrice() {
    debugger
    this.listTrip = this.ListTReplace.filter(x => x.price! <= this.price)
  }
  compareDates(date1: Date): Date {
    const date3 = new Date(date1);
    return date3
  }
  p(value: number) {
    this.listTrip = this.ListTReplace.filter(x => x.price! <= value)
  }
  onOptionSelected(arg0: string) {
    if (Number(arg0) == 0) {
      this.listTrip = this.ListTReplace
    }
    else {
      this.listTrip = this.ListTReplace.filter(x => x.codeKind == Number(arg0))
    }
  }
  move2() {
    Swal.fire('Thank you!', `${this.pUser.currentUser.firstName} תודה על המשוב`, 'success')
  }
  // //////////////////////////////////
  disabled = false;
  max = 10000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  //////////////////////////////////////

  ListTReplace: Array<Trips> = new Array<Trips>()
  listTrip: Array<Trips> = new Array<Trips>()
  list: Array<KindTrip> = new Array<KindTrip>()
  listUsers: Array<Users> = new Array<Users>()
  listOrders: Array<Order> = new Array<Order>()
  order: Order | undefined = new Order()
  newUser: Users = new Users()
  tripUser: Array<Trips> = new Array<Trips>()
  price: number = 10000
  select: string = ""
}
