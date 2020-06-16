import { TestBed } from '@angular/core/testing';

import { PageElementHandlerService } from './page-element-handler.service';

describe('PageElementHandlerService', () => {
  let service: PageElementHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageElementHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
