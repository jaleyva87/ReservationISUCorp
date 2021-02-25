import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsCRUDComponent } from './contacts-crud.component';

describe('ContactsCRUDComponent', () => {
  let component: ContactsCRUDComponent;
  let fixture: ComponentFixture<ContactsCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
