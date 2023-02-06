import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaUnitRmViewComponent } from './rcsa-unit-rm-view.component';

describe('RcsaUnitRmViewComponent', () => {
  let component: RcsaUnitRmViewComponent;
  let fixture: ComponentFixture<RcsaUnitRmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaUnitRmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaUnitRmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
