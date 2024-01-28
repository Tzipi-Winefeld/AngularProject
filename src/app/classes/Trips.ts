import { Time } from "@angular/common";

export class Trips{


    constructor(public code?:number, public goal?:string,public codeKind?:number, public date?:Date,public wayOut?:Time, public howTime?:number,public place?:number,public price?:number, public img?:string,public nameKind?:number, public help?:boolean) {}
    //{"code":10,"goal":"אטליה","codeKind":20,"date":"2024-09-08T00:00:00","wayOut":"07:00:00","howTime":30,"place":13,"price":3500,"img":"trip/1","nameKind":"קשה","help":true},
    }