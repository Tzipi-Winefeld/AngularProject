import { Time } from "@angular/common";

export class Order{
    constructor(public code?:number,public codeUser?:number,public date?:Date,public time?:Time,public codeTrip?:number,public place?:number, public fullName?:string,public goal?:string,public dateTrip?:Date){}
    //{"code":0,"codeUser":102,"date":"2022-11-06T00:00:00","time":"08:00:00","codeTrip":11,"place":4,"fullName":"רותי קינד","goal":"צרפת","dateTrip":"2025-01-01T00:00:00"},
}