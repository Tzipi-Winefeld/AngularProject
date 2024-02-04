import { Time } from "@angular/common";

export class Order{
    constructor(public code?:number,public codeUser?:number,public date?:Date,public time?:Time,public codeTrip?:number,public place?:number, public fullName?:string,public goal?:string,public dateTrip?:Date){}
}