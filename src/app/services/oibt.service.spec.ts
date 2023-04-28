import { TestBed } from '@angular/core/testing';

import { OibtService } from './oibt.service';

describe('OibtService', () => {
  let service: OibtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OibtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
