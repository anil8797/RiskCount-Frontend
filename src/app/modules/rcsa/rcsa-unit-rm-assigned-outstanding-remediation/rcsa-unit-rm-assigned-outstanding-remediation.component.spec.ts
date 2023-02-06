import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaUnitRmAssignedOutstandingRemediationComponent } from './rcsa-unit-rm-assigned-outstanding-remediation.component';

describe('RcsaUnitRmAssignedOutstandingRemediationComponent', () => {
  let component: RcsaUnitRmAssignedOutstandingRemediationComponent;
  let fixture: ComponentFixture<RcsaUnitRmAssignedOutstandingRemediationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaUnitRmAssignedOutstandingRemediationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaUnitRmAssignedOutstandingRemediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
