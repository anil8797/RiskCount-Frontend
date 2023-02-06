import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminSetupRcsaUnitComponent } from './rcsa-admin-setup-rcsa-unit.component';

describe('RcsaAdminSetupRcsaUnitComponent', () => {
  let component: RcsaAdminSetupRcsaUnitComponent;
  let fixture: ComponentFixture<RcsaAdminSetupRcsaUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminSetupRcsaUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminSetupRcsaUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
