import { TestBed } from '@angular/core/testing';

import { GlobalSpinnerInterceptor } from './global-spinner.interceptor';

describe('GlobalSpinnerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalSpinnerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalSpinnerInterceptor = TestBed.inject(GlobalSpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
