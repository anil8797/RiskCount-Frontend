import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaRemediationSummaryReportComponent } from './rcsa-remediation-summary-report.component';

describe('RcsaRemediationSummaryReportComponent', () => {
  let component: RcsaRemediationSummaryReportComponent;
  let fixture: ComponentFixture<RcsaRemediationSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaRemediationSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaRemediationSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
