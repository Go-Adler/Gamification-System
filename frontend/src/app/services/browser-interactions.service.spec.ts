import { TestBed } from '@angular/core/testing';

import { BrowserInteractionsService } from './browser-interactions.service';

describe('BrowserInteractionsService', () => {
  let service: BrowserInteractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserInteractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
