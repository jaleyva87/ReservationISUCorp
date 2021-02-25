import { Injectable, Inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Reservation } from 'src/models/Reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {  

  private headers: HttpHeaders; 
  private myAppUrl: string = 'https://localhost:44310/api/reservation-list';

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8'});
  }
   
  getmyAppUrl() {
     return this.myAppUrl
  }

  getAllReservations() {
    return this._http.get(this.myAppUrl, { headers: this.headers });
  }

  getReservationById(id: number) {
    return this._http.get(this.myAppUrl + '/Details/' + id, { headers: this.headers });
  }

  saveReservation(reservation: Reservation) {
    console.log('service called');
    return this._http.post(this.myAppUrl + '/Create', reservation).pipe(map(
        response => {
          return response;
      }));
  }

  updateReservation(reservation: Reservation) {
    console.log(this.myAppUrl + '/Edit/', reservation);
    return this._http.put(this.myAppUrl + '/Edit/', reservation)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteReservation(id: number): Observable<any> {
    return this._http.delete(this.myAppUrl + '/Delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

}

