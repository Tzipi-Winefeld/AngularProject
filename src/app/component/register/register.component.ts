import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/Users';
import { UsersService } from 'src/app/services/users.service';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checked: boolean = false;

  constructor(public s: UsersService, public r: Router) { }

  ngOnInit(): void {
    this.s.getAll().subscribe(
      succ => { this.listUsers = succ; console.log(this.listUsers) },
      err => { console.log(err) }
    )
    this.f = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), this.checkPassword.bind(this)]),
      'id': new FormControl(null, [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), this.checkPhone.bind(this)]),
    });
  }
  f: FormGroup = new FormGroup({});
  codeUser: number = 0;
  newUser: Users = new Users()
  listUsers: Array<Users> = new Array<Users>();
  send() {
    debugger
    this.newUser = new Users(this.f.value.id, this.f.value.firstName, 0, this.f.value.lastName, this.f.value.email, this.f.value.phone, this.f.value.password, this.checked)

    this.s.add(this.newUser).subscribe(
      Data => {
        this.codeUser = Data;
        if (this.codeUser != -1 && this.codeUser != 0) {
          this.s.getAll().subscribe(
            succ => {
              this.listUsers = succ;
              for (let index = 0; index < this.listUsers.length; index++) {
                if (this.listUsers[index].codeUser == this.codeUser) {
                  this.s.currentUser = this.listUsers[index];
                  this.r.navigate([`ourTrips`])
                }
              }
            },
            er => alert(er)
          )
        }
        else {
          Swal.fire('Oops...', 'קיים משתמש עם מייל זה', 'error');
        }
      },
      Err => console.log(Err)
    )
  }

  get email() {
    return this.f.controls['email']
  }
  get password() {
    return this.f.controls['password']
  }
  get firstName() {
    return this.f.controls['firstName']
  }
  get lastName() {
    return this.f.controls['lastName']
  }
  get phone() {
    return this.f.controls['phone']
  }
  get id() {
    return this.f.controls['id']
  }
  checkEmail(fc: AbstractControl) {
    //return {'errorEmail': true }
    return null;
  }
  checkPassword(fc: AbstractControl) {
    return null
  }
  checkPhone(fc: AbstractControl) {
    return null
  }
  move() {
    this.r.navigate([`ourTrips`])
  }
  matcher = new ErrorStateMatcher();
  hide = true;
}
