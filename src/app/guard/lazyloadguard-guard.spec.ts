import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { lazyloadguardGuard } from './lazyloadguard-guard';

describe('lazyloadguardGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => lazyloadguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
