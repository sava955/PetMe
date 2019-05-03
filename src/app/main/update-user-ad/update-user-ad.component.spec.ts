import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserAdComponent } from './update-user-ad.component';

describe('UpdateUserAdComponent', () => {
  let component: UpdateUserAdComponent;
  let fixture: ComponentFixture<UpdateUserAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
