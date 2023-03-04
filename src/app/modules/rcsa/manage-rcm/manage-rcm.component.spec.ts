import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRcmComponent } from './manage-rcm.component';

describe('ManageRcmComponent', () => {
  let component: ManageRcmComponent;
  let fixture: ComponentFixture<ManageRcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
