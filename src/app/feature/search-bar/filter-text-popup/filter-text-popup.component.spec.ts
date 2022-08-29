import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTextPopupComponent } from './filter-text-popup.component';

describe('FilterTextPopupComponent', () => {
  let component: FilterTextPopupComponent;
  let fixture: ComponentFixture<FilterTextPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTextPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTextPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
