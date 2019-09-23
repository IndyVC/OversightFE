import { TestBed } from '@angular/core/testing';

import { BankaccountService } from './bankaccount.service';

describe('BankaccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankaccountService = TestBed.get(BankaccountService);
    expect(service).toBeTruthy();
  });
});
