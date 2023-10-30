import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSelectInputComponent } from './checkbox-select-input.component';

describe('CheckboxSelectInputComponent', () => {
  let component: CheckboxSelectInputComponent;
  let fixture: ComponentFixture<CheckboxSelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxSelectInputComponent]
    });
    fixture = TestBed.createComponent(CheckboxSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
