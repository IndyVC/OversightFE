import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoValidCombinationComponent } from './no-valid-combination.component';

describe('NoValidCombinationComponent', () => {
  let component: NoValidCombinationComponent;
  let fixture: ComponentFixture<NoValidCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoValidCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoValidCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
