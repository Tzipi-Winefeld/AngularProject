import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OurTripsComponent } from './component/our-trips/our-trips.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { PersonalComponent } from './component/personal/personal.component';
import { TripSpeComponent } from './component/trip-spe/trip-spe.component';
import { AddTripComponent } from './component/add-trip/add-trip.component';
import { AddKindTripComponent } from './component/add-kind-trip/add-kind-trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// /////////////////////////////////////////////////////////////
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManagerUsersComponent } from './component/manager-users/manager-users.component';
import { TripsManagerComponent } from './component/trips-manager/trips-manager.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OurTripsComponent,
    NavComponent,
    HomeComponent,
    PersonalComponent,
    TripSpeComponent,
    AddTripComponent,
    AddKindTripComponent,
    ManagerUsersComponent,
    TripsManagerComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatExpansionModule,
    //http הוספת ספריה המאפשרת שימוש בפרוטוקול 
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
