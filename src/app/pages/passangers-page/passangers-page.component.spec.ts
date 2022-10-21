import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangersPageComponent } from './passangers-page.component';

describe('PassangersPageComponent', () => {
  let component: PassangersPageComponent;
  let fixture: ComponentFixture<PassangersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassangersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
