import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsCRUDComponent } from './contacts-crud/contacts-crud.component';
import { ReservationCRUDComponent } from './reservation-crud/reservation-crud.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

//const routes: Routes = [];
//--Here Ive put my routing--//
const routes: Routes = [
  { path: '', redirectTo: 'contacts-crud', pathMatch: 'full' },
  { path: '404', redirectTo: 'contacts-crud', pathMatch: 'full' },
  { path: 'contacts-crud', component: ContactsCRUDComponent },
  { path: 'reservation-crud', component: ReservationCRUDComponent },
  { path: 'reservation-list', component: ReservationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
