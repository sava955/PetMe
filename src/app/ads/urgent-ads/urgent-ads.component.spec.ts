import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentAdsComponent } from './urgent-ads.component';

describe('UrgentAdsComponent', () => {
  let component: UrgentAdsComponent;
  let fixture: ComponentFixture<UrgentAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrgentAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
