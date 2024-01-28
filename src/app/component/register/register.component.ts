import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/Users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public s: UsersService, public r: Router) { }

  listUsers: Array<Users> = new Array<Users>();

  ngOnInit(): void {
    // subscribe - צופה וממתין לתשובה
    this.s.getAll().subscribe(
      // הפרמטר הראשון לעולם יהיה הצלחה
      //והוא מכיל את הערך שהוחזר
      succ => { this.listUsers = succ; console.log(this.listUsers) },
      //הפרמטר השני כשלון - ואינו חובה
      // הפרמטר מכיל אובייקט שגיאה
      err => { console.log(err) }
    )
    //משתמשים: קוד משתמש, שם, משפחה, טלפון, מייל, סיסמת כניסה, תעודת עזרה ראשונה? (שדה בוליאני)
    this.f = new FormGroup({
      'email': new FormControl(null, [Validators.required, this.checkEmail.bind(this)]),
      'password': new FormControl(null, [Validators.required, this.checkPassword.bind(this)]),
      'id': new FormControl(null, [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'firstHelp': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), this.checkPhone.bind(this)]),
    });
  }
  f: FormGroup = new FormGroup({});
  codeUser: number = 0;
  newUser: Users = new Users()
  send() {
    debugger
    this.newUser = new Users(this.f.value.id, this.f.value.firstName, 0, this.f.value.lastName, this.f.value.email, this.f.value.phone, this.f.value.password, true)

    this.s.add(this.newUser).subscribe(
      Data => {
        this.codeUser = Data; if (this.codeUser != -1 && this.codeUser != 0) {
          this.s.getAll().subscribe(
            succ => { this.listUsers = succ; },
            er => alert(er)
          )
          for (let index = 0; index < this.listUsers.length; index++) {
            if (this.listUsers[index].codeUser == this.codeUser) {
              this.s.currentUser = this.listUsers[index];
              this.r.navigate([`ourTrips`])
            }
          }
        }
        else {
          alert("הרישום לא עבר בהצלחה")
        }
      },
      Err => alert(Err)
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
  get firstHelp() {
    return this.f.controls['firstHelp']
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
    debugger
    return null
  }
}
