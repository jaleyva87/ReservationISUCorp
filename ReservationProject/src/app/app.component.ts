
import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from './reservation-service.service';
import { ContactServiceService } from './contact-service.service';
import * as _ from 'lodash';
import { Contact } from '../models/Contact';
import { Reservation } from '../models/Reservation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  constructor(private contactService: ContactServiceService, private reservationService: ReservationServiceService) {
    
  }

  ngOnInit() {
  }
}
