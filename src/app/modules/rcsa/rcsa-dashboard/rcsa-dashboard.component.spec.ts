import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaDashboardComponent } from './rcsa-dashboard.component';

describe('RcsaDashboardComponent', () => {
  let component: RcsaDashboardComponent;
  let fixture: ComponentFixture<RcsaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
