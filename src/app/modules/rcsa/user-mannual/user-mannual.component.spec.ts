import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMannualComponent } from './user-mannual.component';

describe('UserMannualComponent', () => {
  let component: UserMannualComponent;
  let fixture: ComponentFixture<UserMannualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMannualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMannualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
