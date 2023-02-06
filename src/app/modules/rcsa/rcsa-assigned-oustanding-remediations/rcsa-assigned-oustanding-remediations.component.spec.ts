import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAssignedOustandingRemediationsComponent } from './rcsa-assigned-oustanding-remediations.component';

describe('RcsaAssignedOustandingRemediationsComponent', () => {
  let component: RcsaAssignedOustandingRemediationsComponent;
  let fixture: ComponentFixture<RcsaAssignedOustandingRemediationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAssignedOustandingRemediationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAssignedOustandingRemediationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
