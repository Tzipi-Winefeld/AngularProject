import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTripsComponent } from './our-trips.component';

describe('OurTripsComponent', () => {
  let component: OurTripsComponent;
  let fixture: ComponentFixture<OurTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurTripsComponent]
    });
    fixture = TestBed.createComponent(OurTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
