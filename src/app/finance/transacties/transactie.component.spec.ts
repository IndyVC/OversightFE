import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactieComponent } from './transactie.component';

describe('TransactieComponent', () => {
  let component: TransactieComponent;
  let fixture: ComponentFixture<TransactieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactieComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
