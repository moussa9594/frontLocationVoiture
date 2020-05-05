import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitesClientComponent } from './activites-client.component';

describe('ActivitesClientComponent', () => {
  let component: ActivitesClientComponent;
  let fixture: ComponentFixture<ActivitesClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitesClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
