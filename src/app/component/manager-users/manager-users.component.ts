import { Component, OnInit } from '@angular/core';
import { Trips } from 'src/app/classes/Trips';
import { Users } from 'src/app/classes/Users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {

  constructor(public s: UsersService) { }
  ngOnInit(): void {
    this.s.getAll().subscribe(
      Data => { this.listUsers = Data; },
      Err => alert(Err)
    )
  }
  listUsers: Array<Users> = new Array<Users>()
  listTrip: Array<Trips> = new Array<Trips>()
  showDiv: boolean = false

  trips(code: number | undefined): number {

    this.s.GetAllTripUser(Number(code)).subscribe(
      Data => { this.listTrip = Data },
      Err => alert(Err)
    )
    this.showDiv != this.showDiv
    return this.listTrip.length
  }
}
