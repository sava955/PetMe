import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterRegisterComponent } from './shelter-register.component';

describe('ShelterRegisterComponent', () => {
  let component: ShelterRegisterComponent;
  let fixture: ComponentFixture<ShelterRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
