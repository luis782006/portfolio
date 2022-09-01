import { TestBed } from '@angular/core/testing';

import { AcercaServiceService } from './acerca-service.service';

describe('AcercaServiceService', () => {
  let service: AcercaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcercaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
