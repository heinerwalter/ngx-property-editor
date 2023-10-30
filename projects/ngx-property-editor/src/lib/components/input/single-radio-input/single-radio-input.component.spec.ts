import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRadioInputComponent } from './single-radio-input.component';

describe('SingleRadioInputComponent', () => {
  let component: SingleRadioInputComponent;
  let fixture: ComponentFixture<SingleRadioInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleRadioInputComponent]
    });
    fixture = TestBed.createComponent(SingleRadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
