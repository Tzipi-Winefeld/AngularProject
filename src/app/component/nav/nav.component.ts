import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/Users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public r: Router, public s: UsersService) {
  }
  user: Users = new Users()
  get name() {
    if (this.s.currentUser.firstName != "")
      return this.s.currentUser.firstName;
    else
      return null;
  }
  get manager() {
    return "manager";
  }
  connect() {
    this.r.navigate(['login'])
  }
}
