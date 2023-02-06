import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaCoordinatorViewComponent } from './rcsa-coordinator-view.component';

describe('RcsaCoordinatorViewComponent', () => {
  let component: RcsaCoordinatorViewComponent;
  let fixture: ComponentFixture<RcsaCoordinatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaCoordinatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaCoordinatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
