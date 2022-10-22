import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightEnableComponent } from './flight-enable.component';

describe('FlightEnableComponent', () => {
  let component: FlightEnableComponent;
  let fixture: ComponentFixture<FlightEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightEnableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
