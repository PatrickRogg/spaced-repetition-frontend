import { TestBed } from '@angular/core/testing';

import { FlashCardApiService } from './flash-card-api.service';

describe('FlashCardApiService', () => {
  let service: FlashCardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashCardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
