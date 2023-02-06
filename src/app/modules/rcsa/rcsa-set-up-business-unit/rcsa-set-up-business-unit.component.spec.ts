import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaSetUpBusinessUnitComponent } from './rcsa-set-up-business-unit.component';

describe('RcsaSetUpBusinessUnitComponent', () => {
  let component: RcsaSetUpBusinessUnitComponent;
  let fixture: ComponentFixture<RcsaSetUpBusinessUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaSetUpBusinessUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaSetUpBusinessUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
