import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { ReservationServiceService } from '../reservation-service.service';
import { Http, Headers } from '@angular/http';
import { Reservation } from 'src/models/Reservation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})

export class ReservationListComponent implements AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reservationsList2: Reservation[] = [
    { id: 1, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 1, favorite: true, contactName: "Tom Cover" },
    { id: 2, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 5, favorite: true, contactName: "Tom Cover" },
    { id: 3, placereserv: "Tunas City", datereserv: new Date("2009-08-11"), ranking: 4, favorite: false, contactName: "Leonard" },
    { id: 4, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 2, favorite: true, contactName:  "Brad" },
    { id: 5, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 3, favorite: true, contactName: "Jessica" },
    { id: 6, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 4, favorite: false, contactName: "Anna" },
    { id: 7, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 0, favorite: false, contactName: "Anna" },
    { id: 8, placereserv: "Bayamo City", datereserv: new Date("2009-08-11"), ranking: 1, favorite: true, contactName: "Anna" }
      ];

  displayedColumns: string[] = [ 'PlaceReserv', 'Ranking', 'Favorite', 'Edit'];
  dataSource: MatTableDataSource<Reservation>;
  _ranking: number;
  _favorite: string;
  toggle: boolean;

  constructor(public http: Http, private reservationservice: ReservationServiceService, private renderer: Renderer2) {


    this.reservationservice.getAllReservations().subscribe((data) => this.reservationsList2 = data as Reservation[]);

    // Create this.reservationsList.length reservations
    const reservations = Array.from({ length: this.reservationsList2.length}, (_, k) => this.createNewReservation(k));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(reservations );
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new Reservation on the Table. */
  private createNewReservation(k: number): Reservation {

    const _reservation = this.reservationsList2[k];
    return _reservation;
  }

  /*
  * Here I update the database for ranking
  * */
  public onRateChange(ranking: number, id: number): void {

    let reservation: any;

    for (let i in this.reservationsList2) {
      if (this.reservationsList2[i].id == id) {
        this.reservationsList2[i].ranking = ranking;
        reservation = this.reservationsList2[i];
        break;
      }
    }
    let success;
    this.reservationservice.updateReservation(reservation).subscribe((data) => { success = data as string });

  }    


  public setFavorite(value: boolean): string {

    value === false ? this._favorite = 'color: grey;' : this._favorite = 'color: red;';
    return this._favorite;
  }

  /**
   * In this method I add or not a reservation to favorites
   * I work with css by using value.ripple.trigger.style.color
   * later I search and update the reservation in the list
   * and send it to database
   * @param value
   */
  public toggleColor(value: any): void {

    let id: number = value.ripple.trigger.attributes.value.value;
    let fav: boolean;

    if (value.ripple.trigger.style.color == 'red') {
      value.ripple.trigger.style = 'color: grey;'
      fav = false;
    } else {
      value.ripple.trigger.style = 'color: red;';
      fav = true;
    }

    let reservation: any;

    for (let i in this.reservationsList2) {
      if (this.reservationsList2[i].id == id) {
        this.reservationsList2[i].favorite = fav;
        reservation = this.reservationsList2[i];
        break;
      }
    }
    let success;
    this.reservationservice.updateReservation(reservation).subscribe((data) => { success = data as string});
  }

  public getID(id: number): string {
    return String(id);
  }

}

