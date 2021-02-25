import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { empty, Observable } from 'rxjs';
import { concat, map, startWith } from 'rxjs/operators';
import { EventEmitter, Input, Output } from '@angular/core';
import { ReservationServiceService } from '../reservation-service.service';
import { ContactServiceService } from '../contact-service.service';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Contact } from 'src/models/Contact';
import { NgIf } from '@angular/common';

export interface Optionss {
  name: string;
}

@Component({
  selector: 'app-contacts-crud',
  templateUrl: './contacts-crud.component.html',
  styleUrls: ['./contacts-crud.component.css']
})
export class ContactsCRUDComponent implements OnInit {
  @Input() contactsList: Contact[];
  _name: any = '';
  _phone: any = '';
  _date: any = '';
  _contactype: any = '';
  _contact = new Contact();
  contactForm: FormGroup;
  errorMessage: string = '';
  infotext: string = '';
  myControl = new FormControl();
  options: Optionss[];
  filteredOptions: Observable<Optionss[]>;

  constructor(public http: Http, private _router: Router, private contactservice: ContactServiceService, private fb: FormBuilder, private renderer: Renderer2) {

    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      contacttype: ['', [Validators.required]],
      date: ['', [Validators.required]],
      phone: ['']
    }) 
  }

  getContactsq() {

    this.contactservice.getAllContacts().subscribe((data: any) => {
      data.forEach(contact => {
        this.contactsList.push({ name: contact.name, contacttype: contact.contacttype, phone: contact.phone, birthdate: contact.birthdate });
        this.options.push({ name: contact.name });
      });

    });
    console.log(this.contactsList);
  }

  ngOnInit() {

    this.getEverythingReady();

  }

  //-these method are for filtering contact names
  displayFn(user: Optionss): string {

    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Optionss[] {

    const filterValue = name.toLowerCase();
    console.log(this.contactsList[0].contacttype);
    console.log(this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
    console.log(this.options);

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  /*This function is for catching keyboard event
   * this way I able to check and get all contact date
   * that the user had typed
   * */
  catchKeyup(value: string): void {

    this.infotext = '';
    this._name = value;
   
    if (value.length > 0) {
      this.contactservice.getContactByName(value).subscribe((data: any) => this._contact = data);
      if (this._contact.contacttype != undefined) {
        this._contactype = String(this._contact.contacttype);
        this.contactForm.value.contacttype = this._contactype;
        }
        if (this._contact.phone != undefined) {
          this._phone = String(this._contact.phone);
          this.contactForm.value.phone = this._phone;
        }
      if (this._contact.birthdate != undefined) {
          const datetemp = new Date(this._contact.birthdate);//-Formating the date yyyy-mm-dd
          this._date = this.convertDate(datetemp);
        }
    }    

  }

  //Auxiliar method for date formating yyyy-mm-dd
  private convertDate(date: Date) {

    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();

    let mmChars = mm.split('');
    let ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }

  /* with this method I can save a new contact or edit a contact
   * sending the changes into the database
   * I used expresions regular to validate input elements 
   * */
  public createContact() {

    this.infotext = "";
    let itwassuccess: boolean = true;

    let evaluate = /^[a-zA-Z]+\s*[A-Za-z]+$/;
    let whitespaces = /^\s{1,*}$/;
    this._name = String(this._name).trimRight();
    this.contactForm.value.phone = this._phone;

    if (evaluate.test(this._name)) {
      this.contactForm.get('namespan')?.reset();
      if (this._date.length === 0) {
        itwassuccess = false;
        this.infotext = "Wrong date.";
      }
    } else {
      itwassuccess = false;
      this.infotext = "Wrong name format.";
    }

    console.log(this._date.length);

    if (itwassuccess) {
      let success: string = '';
      let newcontact: Contact = { name: this._name, contacttype: this._contactype, phone: this._phone, birthdate: this._date };
      /*--In this point I verify if this name exist in database
       *--If I find it I make a edition operation
       *  otherwise I save the new contact in database
       * */
      let contact: Contact = { name: this._name, contacttype: 0, phone: 0, birthdate: '' };
      let create: boolean = true;
      this.contactsList.forEach(contact => { contact.name === this._name ? create = false : true; });
      console.log(create);

      if (create) {
        let result = this.contactservice.saveContact(newcontact).subscribe((data) => {
          success = data as string
        }, error => this.errorMessage = error)
        //---I clean everything and I start again the name filter
        this.getEverythingReady();
        this.infotext = "The Contact was created.";
      }
      else {
        let result = this.contactservice.updateContact(newcontact).subscribe((data) => {
          success = data as string
        }, error => this.errorMessage = error)
        this.infotext = "The Contact was edited.";
      }

    }

  }

  //--Theses three event capture keyboard events

  public clickOnPhone(event: any): void {
    this._phone = event.target.value;
    let evaluatephone = /^[0-9]+$/;//---this is for phone number
    this._phone = String(this._phone).trim();
    let tempphone: string = '';
    for (let i in this._phone) {
      if (evaluatephone.test(this._phone[i])) {
        tempphone += this._phone[i];
      }
    }
    this._phone = tempphone;
    event.target.value = this._phone;
  }

  public changeDate(value: string): void{

    this._date = value;
  }

  public changeContactType(value: string): void {

    this._contactype = value;
  }

  private changePhone(): void {
    /*In this code block I guarantee _phone be a number
     * I extract any other character
     * */
    let evaluatephone = /^[0-9]+$/;//---this is for phone number
    this._phone = String(this._phone).trim();
    let tempphone: string = '';
    for (let i in this._phone) {
      if (evaluatephone.test(this._phone[i])) {
        tempphone += this._phone[i];
      }
    }
    this._phone = tempphone;
  }

  //---This function clean everything and make a start point
  private getEverythingReady(): void {

    this._name = "";
    this._date = "";
    this._contactype = "";
    this._phone = "";
    this.myControl = new FormControl();
    this.contactsList = [];
    this.options = [];
    this.getContactsq();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

}


