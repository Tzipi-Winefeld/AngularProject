import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKindTripComponent } from './add-kind-trip.component';

describe('AddKindTripComponent', () => {
  let component: AddKindTripComponent;
  let fixture: ComponentFixture<AddKindTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKindTripComponent]
    });
    fixture = TestBed.createComponent(AddKindTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
