import { Time } from "@angular/common";

export class Trips{


    constructor(public code?:number, public goal?:string,public codeKind?:number, public date?:Date,public wayOut?:Time, public howTime?:number,public place?:number,public price?:number, public img?:string,public nameKind?:number, public help?:boolean) {}
    }