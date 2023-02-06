import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaDashboardRiskComponent } from './rcsa-dashboard-risk.component';

describe('RcsaDashboardRiskComponent', () => {
  let component: RcsaDashboardRiskComponent;
  let fixture: ComponentFixture<RcsaDashboardRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaDashboardRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaDashboardRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
