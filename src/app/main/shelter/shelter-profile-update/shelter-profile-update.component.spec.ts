import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterProfileUpdateComponent } from './shelter-profile-update.component';

describe('ShelterProfileUpdateComponent', () => {
  let component: ShelterProfileUpdateComponent;
  let fixture: ComponentFixture<ShelterProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
