import { Component } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-tt',
  templateUrl: './tt.component.html',
  styleUrls: ['./tt.component.css']
})
export class TtComponent {

  constructor(public dialog: MatDialog) {}
  // @ViewChild(MatAccordion) accordion: MatAccordion;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TtComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
