import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ngOnInit():void{
    const man=JSON.stringify({email:"man@gmail.com",password:"111"})
    localStorage.setItem("manager",man);
  }
  text="Jurney in world"
}
