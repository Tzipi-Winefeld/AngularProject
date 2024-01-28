import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/Users';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public s: UsersService, public r: Router) { }

  listUsers: Array<Users> = new Array<Users>();
  current: Users = new Users()
  f: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.f = new FormGroup({
      'email': new FormControl(null, [Validators.required, this.checkEmail.bind(this)]),
      'password': new FormControl(null, [Validators.required, this.checkPassword.bind(this)]),
    });

    this.s.getAll().subscribe(
      Data => { this.listUsers = Data; },
      Err => alert(Err)
    )
  }


  send() {
    const m=localStorage.getItem('manager')
    const mm=JSON.parse(m!)
    //פונקציה מהשרת שבודקת האם משתמש או מנהל
    if (this.f.value.email == mm.email && this.f.value.password == mm.password) {
      this.s.currentUser.firstName = "manager"
      this.r.navigate([`ourTripsManager`])
    }
    for (let index = 0; index < this.listUsers.length; index++) {
      if (this.listUsers[index].email == this.f.value.email && this.listUsers[index].password == this.f.value.password) {
        //אזור אישי
        //שם משתמש
        this.s.currentUser = this.listUsers[index];
        localStorage.setItem("currentUser",JSON.stringify(this.listUsers[index]))
        this.r.navigate([`ourTrips`])
      }
    }
    // debugger
    // this.s.GetUser(this.f.value.email,this.f.value.password).subscribe(
    //   Data=>{this.current=Data;},
    //   Err=>alert(Err)
    //   )
    //   debugger
    //   if(this.current!=undefined){
    //     debugger
    //     this.s.currentUser=this.current;
    //     this.r.navigate([`ourTrips`])
    //   }

  }

  get email() {
    return this.f.controls['email']
  }
  get password() {
    return this.f.controls['password']
  }


  checkEmail(fc: AbstractControl) {
    debugger
    // if(/^[a-zA-Zא-ת]+$/.test(fc.value))
    //    return{'errorEmail':true} 
    return null;
  }

  checkPassword(fc: AbstractControl) {
    debugger
    return null
  }

}
