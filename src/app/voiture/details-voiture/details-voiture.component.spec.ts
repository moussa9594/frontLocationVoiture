import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVoitureComponent } from './details-voiture.component';

describe('DetailsVoitureComponent', () => {
  let component: DetailsVoitureComponent;
  let fixture: ComponentFixture<DetailsVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
