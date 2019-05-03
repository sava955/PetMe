import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGenderComponent } from './search-gender.component';

describe('SearchGenderComponent', () => {
  let component: SearchGenderComponent;
  let fixture: ComponentFixture<SearchGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
