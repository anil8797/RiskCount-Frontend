import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAdminSetupRegionsComponent } from './rcsa-admin-setup-regions.component';

describe('RcsaAdminSetupRegionsComponent', () => {
  let component: RcsaAdminSetupRegionsComponent;
  let fixture: ComponentFixture<RcsaAdminSetupRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAdminSetupRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAdminSetupRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
