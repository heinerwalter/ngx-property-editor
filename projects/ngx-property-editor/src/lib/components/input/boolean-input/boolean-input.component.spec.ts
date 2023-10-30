import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanInputComponent } from './boolean-input.component';

describe('BooleanInputComponent', () => {
  let component: BooleanInputComponent;
  let fixture: ComponentFixture<BooleanInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanInputComponent]
    });
    fixture = TestBed.createComponent(BooleanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
