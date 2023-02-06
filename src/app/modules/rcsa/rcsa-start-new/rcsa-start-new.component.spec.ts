import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaStartNewComponent } from './rcsa-start-new.component';

describe('RcsaStartNewComponent', () => {
  let component: RcsaStartNewComponent;
  let fixture: ComponentFixture<RcsaStartNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaStartNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaStartNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
