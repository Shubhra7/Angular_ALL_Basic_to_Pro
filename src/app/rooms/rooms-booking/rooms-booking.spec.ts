import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsBooking } from './rooms-booking';

describe('RoomsBooking', () => {
  let component: RoomsBooking;
  let fixture: ComponentFixture<RoomsBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
