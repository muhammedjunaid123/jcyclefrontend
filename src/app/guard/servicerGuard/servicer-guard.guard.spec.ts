import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { servicerGuardGuard } from './servicer-guard.guard';

describe('servicerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => servicerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
