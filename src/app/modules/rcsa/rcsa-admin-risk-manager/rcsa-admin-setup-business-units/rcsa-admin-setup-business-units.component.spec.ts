import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminSetupBusinessUnitsComponent } from './rcsa-admin-setup-business-units.component';

describe('RcsaAdminSetupBusinessUnitsComponent', () => {
  let component: RcsaAdminSetupBusinessUnitsComponent;
  let fixture: ComponentFixture<RcsaAdminSetupBusinessUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminSetupBusinessUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminSetupBusinessUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
