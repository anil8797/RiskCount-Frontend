import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminRiskManagerComponent } from './rcsa-admin-risk-manager.component';

describe('RcsaAdminRiskManagerComponent', () => {
  let component: RcsaAdminRiskManagerComponent;
  let fixture: ComponentFixture<RcsaAdminRiskManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminRiskManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminRiskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
