import { TestBed } from '@angular/core/testing';

import { ServiceVoitureService } from './service-voiture.service';

describe('ServiceVoitureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceVoitureService = TestBed.get(ServiceVoitureService);
    expect(service).toBeTruthy();
  });
});
