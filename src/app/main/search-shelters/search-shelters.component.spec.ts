import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSheltersComponent } from './search-shelters.component';

describe('SearchSheltersComponent', () => {
  let component: SearchSheltersComponent;
  let fixture: ComponentFixture<SearchSheltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSheltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
