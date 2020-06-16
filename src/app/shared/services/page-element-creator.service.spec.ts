import { TestBed } from '@angular/core/testing';

import { PageElementCreatorService } from './page-element-creator.service';

describe('PageElementCreatorService', () => {
  let service: PageElementCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageElementCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
