import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/Users';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  move() {
    this.r.navigate([`ourTrips`])
  }

  constructor(public s: UsersService, public r: Router) { }

  listUsers: Array<Users> = new Array<Users>();
  current: Users = new Users()
  f: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.f = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), this.checkPassword.bind(this)]),
    });

    this.s.getAll().subscribe(
      Data => { this.listUsers = Data; },
      Err => console.log(Err)
    )
  }

  send() {
    const m = localStorage.getItem('manager')
    const mm = JSON.parse(m!)
    //פונקציה מהשרת שבודקת האם משתמש או מנהל
    if (this.f.value.email == mm.email && this.f.value.password == mm.password) {
      this.s.currentUser.firstName = "manager"
      this.r.navigate([`ourTrips`])
      return;
    }
    for (let index = 0; index < this.listUsers.length; index++) {
      if (this.listUsers[index].email == this.f.value.email && this.listUsers[index].password == this.f.value.password) {
        //אזור אישי
        //שם משתמש
        this.s.currentUser = this.listUsers[index];
        localStorage.setItem("currentUser", JSON.stringify(this.listUsers[index]))
        this.r.navigate([`ourTrips`])
        return
      }
      this.r.navigate([`register`])
    }
  }

  get email() {
    return this.f.controls['email']
  }
  get password() {
    return this.f.controls['password']
  }

  checkPassword(fc: AbstractControl) {
    debugger
    return null
  }
  matcher = new ErrorStateMatcher();
  hide = true;

}
