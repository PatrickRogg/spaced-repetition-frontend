import { TestBed } from '@angular/core/testing';

import { FlashCardRepetitionApiService } from './flash-card-repetition-api.service';

describe('FlashCardRepetitionApiService', () => {
  let service: FlashCardRepetitionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashCardRepetitionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
