import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueMedicineOutsidersComponent } from './issue-medicine-outsiders.component';

describe('IssueMedicineOutsidersComponent', () => {
  let component: IssueMedicineOutsidersComponent;
  let fixture: ComponentFixture<IssueMedicineOutsidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueMedicineOutsidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueMedicineOutsidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
