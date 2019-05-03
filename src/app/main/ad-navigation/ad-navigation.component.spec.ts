import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNavigationComponent } from './ad-navigation.component';

describe('AdNavigationComponent', () => {
  let component: AdNavigationComponent;
  let fixture: ComponentFixture<AdNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
