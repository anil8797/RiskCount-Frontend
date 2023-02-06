import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminSetFinancialLossComponent } from './rcsa-admin-set-financial-loss.component';

describe('RcsaAdminSetFinancialLossComponent', () => {
  let component: RcsaAdminSetFinancialLossComponent;
  let fixture: ComponentFixture<RcsaAdminSetFinancialLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminSetFinancialLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminSetFinancialLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
