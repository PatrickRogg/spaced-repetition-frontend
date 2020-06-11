import { TestBed } from '@angular/core/testing';

import { FlashCardDeckApiService } from './flash-card-deck-api.service';

describe('FlashCardDeckApiService', () => {
  let service: FlashCardDeckApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashCardDeckApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
