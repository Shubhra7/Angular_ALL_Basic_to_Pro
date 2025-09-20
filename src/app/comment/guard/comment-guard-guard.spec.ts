import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { commentGuardGuard } from './comment-guard-guard';

describe('commentGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => commentGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
