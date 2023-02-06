import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaDashboardRemediationComponent } from './rcsa-dashboard-remediation.component';

describe('RcsaDashboardRemediationComponent', () => {
  let component: RcsaDashboardRemediationComponent;
  let fixture: ComponentFixture<RcsaDashboardRemediationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaDashboardRemediationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaDashboardRemediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
