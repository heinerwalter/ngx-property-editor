import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaInputComponent } from './text-area-input.component';

describe('TextAreaInputComponent', () => {
  let component: TextAreaInputComponent;
  let fixture: ComponentFixture<TextAreaInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaInputComponent]
    });
    fixture = TestBed.createComponent(TextAreaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
