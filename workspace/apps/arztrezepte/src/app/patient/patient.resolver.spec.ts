import { TestBed } from '@angular/core/testing';

import { PatientResolver } from './patient.resolver';

describe('PatientResolver', () => {
  let resolver: PatientResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PatientResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
