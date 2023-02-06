import { TestBed, async, inject } from '@angular/core/testing';

import { AuthSuccessGuard } from './auth-success.guard';

describe('AuthSuccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSuccessGuard]
    });
  });

  it('should ...', inject([AuthSuccessGuard], (guard: AuthSuccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
