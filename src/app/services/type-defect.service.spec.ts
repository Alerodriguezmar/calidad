import { TestBed } from '@angular/core/testing';

import { TypeDefectService } from './type-defect.service';

describe('TypeDefectService', () => {
  let service: TypeDefectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDefectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
