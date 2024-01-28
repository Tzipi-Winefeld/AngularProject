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
      Err => alert(Err)
    )

    this.kind.getAll().subscribe(
      Data => { this.list = Data; },
      Err => alert(Err)
    )
  }
  code: number = 0
  bool: boolean = false
  bool2: boolean = false
  d1: Date = new Date()
  save() {
    debugger
    console.log(this.newUser);
    // this.pSer.myAllProducts.push(this.newProduct)
    // this.pSer.myProducts=this.pSer.myAllProducts.filter(a=>a.idC==this.newProduct.idC)
    this.pUser.update(this.newUser).subscribe(
      Data => {
        this.code = Data;
        if (this.code > 0) {
          alert("עודכן בהצלחה")
        }
        else {
          alert("העדכון לא התבצע נסה שוב")
        }
      },
      Err => console.log(Err)
    )
  }
  move(code: number | undefined) {
    debugger
    //alert(code)
    //this.ListT=this.ListT.filter(x=>x.codeKind==code)
    this.r.navigate([`speTrip/${code}`])

  }
  delete(code: number | undefined) {
    debugger
    //כל ההזמנות
    this.or.getAll().subscribe(
      Data => {
        this.listOrders = Data;//סינון של ההזמנה הרצויה
        this.order = this.listOrders.find(x => x.codeUser == Number(this.pUser.currentUser.codeUser) && x.codeTrip == code)
        //מחיקה של ההזמנה
        this.or.del((Number(this.order?.code))).subscribe(
          Data => {
            this.bool2 = Data;
            if (this.bool2 == true) {
              this.pUser.GetAllTripUser(Number(this.pUser.currentUser.codeUser)).subscribe(
                Data => { this.listTrip = Data; this.ListTReplace = Data },
                Err => alert(Err)
              )
              alert("ההסרה בוצעה בהצלחה")
            }
            else {
              alert("הביטול לא התבצע בהצלחה")
            }
          },
          Err => console.log(Err)
        )

      },
      Err => alert(Err)
    )
  }
  mydelete() {
    debugger

    this.pUser.GetAllTripUser((Number(this.pUser.currentUser.codeUser))).subscribe(
      Data => {
        this.tripUser = Data;
        for (let i = 0; i < this.tripUser.length; i++) {
          if (this.tripUser[i].date! > new Date())
            alert("יש לך טיולים עתידיים שאתה רשום אליהם אנא בטל אותם קודם")
        }
        this.pUser.del((Number(this.pUser.currentUser.codeUser))).subscribe(
          Data => {
            this.bool = Data; if (this.bool == true) {
              alert("ההסרה בוצעה בהצלחה")
            }
            else {
              alert("יש לך טיולים עתידיים שאתה רשום אליהם אנא בטל אותם קודם")
            }
          },
          Err => console.log(Err)
        )
      },
      Err => console.log(Err)
    )
  }
  onOptionSelected(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    let numericValue = Number(selectedOption);
    this.listTrip = this.ListTReplace.filter(x => x.codeKind == numericValue)
  }
  past() {
    this.listTrip = this.ListTReplace.filter(x => this.compareDates(x.date!) < this.d1)
  }

  future() {
    this.listTrip = this.ListTReplace.filter(x => this.compareDates(x.date!) > this.d1)
  }
  filterPrice(){
    debugger
    this.listTrip = this.ListTReplace.filter(x => x.price!<=this.price)
  }
  compareDates(date1: Date): Date {
    const date3 = new Date(date1);
    return date3
  }


  ListTReplace: Array<Trips> = new Array<Trips>()
  listTrip: Array<Trips> = new Array<Trips>()
  list: Array<KindTrip> = new Array<KindTrip>()
  listUsers: Array<Users> = new Array<Users>()
  listOrders: Array<Order> = new Array<Order>()
  order: Order | undefined = new Order()
  newUser: Users = new Users()
  tripUser: Array<Trips> = new Array<Trips>()
  price:number=10000
}
