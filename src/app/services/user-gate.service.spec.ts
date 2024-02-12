import { TestBed } from '@angular/core/testing';

import { UserGateService } from './user-gate.service';

describe('UserGateService', () => {
  let service: UserGateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
