import { TestBed } from '@angular/core/testing';

import { HardSoftService } from './hard-soft-service.service';

describe('HardSoftService', () => {
  let service: HardSoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardSoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
