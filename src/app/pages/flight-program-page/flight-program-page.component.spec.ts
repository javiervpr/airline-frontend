import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightProgramPageComponent } from './flight-program-page.component';

describe('FlightProgramPageComponent', () => {
  let component: FlightProgramPageComponent;
  let fixture: ComponentFixture<FlightProgramPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightProgramPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightProgramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
