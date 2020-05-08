import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservationsComponent } from './gestion-reservations.component';

describe('GestionReservationsComponent', () => {
  let component: GestionReservationsComponent;
  let fixture: ComponentFixture<GestionReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
