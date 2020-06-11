import { TestBed } from '@angular/core/testing';

import { NextRepetitionService } from './next-repetition.service';

describe('NextRepetitionService', () => {
  let service: NextRepetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextRepetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
