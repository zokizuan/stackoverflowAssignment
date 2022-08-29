import { TestBed } from '@angular/core/testing';

import { StackApiService } from './stack-api.service';

describe('SearchApiService', () => {
  let service: StackApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
