import { TestBed } from '@angular/core/testing';

import { FabricReportService } from './fabric-report.service';

describe('FabricReportService', () => {
  let service: FabricReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
