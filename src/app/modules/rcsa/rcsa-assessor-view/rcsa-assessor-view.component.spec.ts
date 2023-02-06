import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaAssessorViewComponent } from './rcsa-assessor-view.component';

describe('RcsaAssessorViewComponent', () => {
  let component: RcsaAssessorViewComponent;
  let fixture: ComponentFixture<RcsaAssessorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaAssessorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaAssessorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
