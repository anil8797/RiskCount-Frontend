import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaComponent } from './rcsa.component';

describe('RcsaComponent', () => {
  let component: RcsaComponent;
  let fixture: ComponentFixture<RcsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
