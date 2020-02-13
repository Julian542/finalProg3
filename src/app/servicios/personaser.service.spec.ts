import { TestBed } from '@angular/core/testing';

import { PersonaserService } from './personaser.service';

describe('PersonaserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaserService = TestBed.get(PersonaserService);
    expect(service).toBeTruthy();
  });
});
