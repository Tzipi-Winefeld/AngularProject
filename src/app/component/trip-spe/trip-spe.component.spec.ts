import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSpeComponent } from './trip-spe.component';

describe('TripSpeComponent', () => {
  let component: TripSpeComponent;
  let fixture: ComponentFixture<TripSpeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripSpeComponent]
    });
    fixture = TestBed.createComponent(TripSpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
