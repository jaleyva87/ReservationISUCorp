import { Injectable, Inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Contact } from 'src/models/Contact';
import { Reservation } from 'src/models/Reservation';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private headers: HttpHeaders;
  private myAppUrl: string = 'https://localhost:44310/api/contacts-crud';
  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getmyAppUrl() {
    return this.myAppUrl
  }

  getAllContacts() {
    return this._http.get(this.myAppUrl, { headers: this.headers });
  }

  getContactByName(name: string) {
    return this._http.get(this.myAppUrl + '/Details/' + name, { headers: this.headers });
  }

  saveContact(contact: Contact) {
    return this._http.post(this.myAppUrl + '/Create', contact).pipe(map(
      response => {
        return response;
      }));
  }

  updateContact(contact: Contact) {
    return this._http.put(this.myAppUrl + '/Edit', contact)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteContact(name: string): Observable<any> {
    return this._http.delete(this.myAppUrl + '/Delete/' + name)
      .pipe(map(
        response => {
          return response;
        }));
  }

}

