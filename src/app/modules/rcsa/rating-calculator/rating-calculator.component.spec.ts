import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCalculatorComponent } from './rating-calculator.component';

describe('RatingCalculatorComponent', () => {
  let component: RatingCalculatorComponent;
  let fixture: ComponentFixture<RatingCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
