import { TestBed, inject } from '@angular/core/testing';

import { RcsaService } from './rcsa.service';

describe('RcsaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RcsaService]
    });
  });

  it('should be created', inject([RcsaService], (service: RcsaService) => {
    expect(service).toBeTruthy();
  }));
});
