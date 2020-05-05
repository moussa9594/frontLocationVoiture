import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVoituresComponent } from './gestion-voitures.component';

describe('GestionVoituresComponent', () => {
  let component: GestionVoituresComponent;
  let fixture: ComponentFixture<GestionVoituresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionVoituresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
