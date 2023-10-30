import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingInputComponent } from './rating-input.component';

describe('RatingInputComponent', () => {
  let component: RatingInputComponent;
  let fixture: ComponentFixture<RatingInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingInputComponent]
    });
    fixture = TestBed.createComponent(RatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
