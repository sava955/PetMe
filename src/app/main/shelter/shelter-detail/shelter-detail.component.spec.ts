import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterDetailComponent } from './shelter-detail.component';

describe('ShelterDetailComponent', () => {
  let component: ShelterDetailComponent;
  let fixture: ComponentFixture<ShelterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
