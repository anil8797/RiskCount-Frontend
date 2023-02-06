import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminSetupRiskPolicyControlComponent } from './rcsa-admin-setup-risk-policy-control.component';

describe('RcsaAdminSetupRiskPolicyControlComponent', () => {
  let component: RcsaAdminSetupRiskPolicyControlComponent;
  let fixture: ComponentFixture<RcsaAdminSetupRiskPolicyControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminSetupRiskPolicyControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminSetupRiskPolicyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
