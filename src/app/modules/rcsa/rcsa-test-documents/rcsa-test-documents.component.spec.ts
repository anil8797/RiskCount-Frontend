import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcsaTestDocumentsComponent } from './rcsa-test-documents.component';

describe('RcsaTestDocumentsComponent', () => {
  let component: RcsaTestDocumentsComponent;
  let fixture: ComponentFixture<RcsaTestDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcsaTestDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcsaTestDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
