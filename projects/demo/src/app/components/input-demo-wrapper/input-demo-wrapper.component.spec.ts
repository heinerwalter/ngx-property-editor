import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDemoWrapperComponent } from './input-demo-wrapper.component';

describe('InputComponentDemoWrapperComponent', () => {
  let component: InputDemoWrapperComponent;
  let fixture: ComponentFixture<InputDemoWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputDemoWrapperComponent]
    });
    fixture = TestBed.createComponent(InputDemoWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
