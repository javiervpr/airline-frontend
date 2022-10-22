import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightProgramFormComponent } from './flight-program-form.component';

describe('FlightProgramFormComponent', () => {
  let component: FlightProgramFormComponent;
  let fixture: ComponentFixture<FlightProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightProgramFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
