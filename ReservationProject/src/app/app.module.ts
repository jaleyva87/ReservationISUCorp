import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCRUDComponent } from './reservation-crud/reservation-crud.component';
import { ReservationServiceService } from './reservation-service.service';
import { ContactServiceService } from './contact-service.service';
import { ContactsCRUDComponent } from './contacts-crud/contacts-crud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FateModule, FateMaterialModule } from 'fate-editor';
import { MatDividerModule } from '@angular/material/divider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTabsModule } from '@angular/material/tabs';

const appRoutes: Routes = [
  { path: '', redirectTo: 'contacts-crud', pathMatch: 'full' },
  { path: '404', redirectTo: 'contacts-crud', pathMatch: 'full' },
  { path: 'contacts-crud', component: ContactsCRUDComponent },
  { path: 'reservation-crud', component: ReservationCRUDComponent },
  { path: 'reservation-list', component: ReservationListComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    ReservationListComponent,
    ReservationCRUDComponent,
    ContactsCRUDComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    FateModule,
    FateMaterialModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDatepickerModule,
    NgbModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [ContactServiceService, ReservationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
