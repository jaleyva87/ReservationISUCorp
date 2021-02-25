import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCRUDComponent } from './reservation-crud.component';

describe('ReservationCRUDComponent', () => {
  let component: ReservationCRUDComponent;
  let fixture: ComponentFixture<ReservationCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
