import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedByTransactionsComponent } from './used-by-transactions.component';

describe('UsedByTransactionsComponent', () => {
  let component: UsedByTransactionsComponent;
  let fixture: ComponentFixture<UsedByTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedByTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedByTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
