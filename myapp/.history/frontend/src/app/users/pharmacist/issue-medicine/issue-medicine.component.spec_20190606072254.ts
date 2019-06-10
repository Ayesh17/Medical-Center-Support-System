import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueMedicineComponent } from './issue-medicine.component
//import { PharmacistComponent } from './../pharmacist.component';

describe('PrescriptionComponent', () => {
  let component: IssueMedicineComponent ;
  let fixture: ComponentFixture < IssueMedicineComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueMedicineComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( IssueMedicineComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
