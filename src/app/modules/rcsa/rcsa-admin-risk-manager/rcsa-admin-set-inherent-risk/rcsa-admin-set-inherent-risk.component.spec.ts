import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminSetInherentRiskComponent } from './rcsa-admin-set-inherent-risk.component';

describe('RcsaAdminSetInherentRiskComponent', () => {
  let component: RcsaAdminSetInherentRiskComponent;
  let fixture: ComponentFixture<RcsaAdminSetInherentRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminSetInherentRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminSetInherentRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
