import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsManagerComponent } from './trips-manager.component';

describe('TripsManagerComponent', () => {
  let component: TripsManagerComponent;
  let fixture: ComponentFixture<TripsManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripsManagerComponent]
    });
    fixture = TestBed.createComponent(TripsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
