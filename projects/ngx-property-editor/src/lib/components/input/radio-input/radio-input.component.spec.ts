import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioInputComponent } from './radio-input.component';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioInputComponent]
    });
    fixture = TestBed.createComponent(RadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
