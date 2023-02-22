import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaCoordinatorDashboardComponent } from './rcsa-coordinator-dashboard.component';

describe('RcsaCoordinatorDashboardComponent', () => {
  let component: RcsaCoordinatorDashboardComponent;
  let fixture: ComponentFixture<RcsaCoordinatorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaCoordinatorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaCoordinatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
