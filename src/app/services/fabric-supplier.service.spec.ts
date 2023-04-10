import { TestBed } from '@angular/core/testing';

import { FabricSupplierService } from './fabric-supplier.service';

describe('FabricSupplierService', () => {
  let service: FabricSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
