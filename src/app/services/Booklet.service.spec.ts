import { TestBed } from '@angular/core/testing';

import { BookletService } from './Booklet.service';

describe('JozvehyarService', () => {
  let service: BookletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
