import { TestBed } from '@angular/core/testing';

import { RootStateService } from './root-state.service';

describe('RootStateService', () => {
  let service: RootStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
