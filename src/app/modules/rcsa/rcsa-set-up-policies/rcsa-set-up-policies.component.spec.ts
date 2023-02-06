import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaSetUpPoliciesComponent } from './rcsa-set-up-policies.component';

describe('RcsaSetUpPoliciesComponent', () => {
  let component: RcsaSetUpPoliciesComponent;
  let fixture: ComponentFixture<RcsaSetUpPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaSetUpPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaSetUpPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
