import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShelterAd } from './update-shelter-ad.component';

describe('UpdateShelterAd', () => {
  let component: UpdateShelterAd;
  let fixture: ComponentFixture<UpdateShelterAd>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateShelterAd ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShelterAd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
