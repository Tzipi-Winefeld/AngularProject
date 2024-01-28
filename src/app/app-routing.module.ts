import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OurTripsComponent } from './component/our-trips/our-trips.component';
import { HomeComponent } from './component/home/home.component';
import { PersonalComponent } from './component/personal/personal.component';
import { AddTripComponent } from './component/add-trip/add-trip.component';
import { AddKindTripComponent } from './component/add-kind-trip/add-kind-trip.component';
import { TripSpeComponent } from './component/trip-spe/trip-spe.component';
import { ManagerUsersComponent } from './component/manager-users/manager-users.component';
import { TripsManagerComponent } from './component/trips-manager/trips-manager.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'ourTrips',component:OurTripsComponent},
  {path:'personal',component:PersonalComponent},
  {path:'addTrip',component:AddTripComponent},
  {path:'ourTripsManager',component:TripsManagerComponent,children:[
    {path:'addTrip',component:AddTripComponent}
  ]},
  {path:'managerUsers',component:ManagerUsersComponent},
  {path:'speTrip/:code',component:TripSpeComponent},
  {path:'addKindTrip',component:AddKindTripComponent},
  {path:'register',component:RegisterComponent,
  
  children:[
    
    //{path:'details/:idP',component:DetailsComponent}
  ]}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
