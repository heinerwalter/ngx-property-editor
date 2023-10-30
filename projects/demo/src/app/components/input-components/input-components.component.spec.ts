import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponentsComponent } from './input-components.component';

describe('InputComponentsComponent', () => {
  let component: InputComponentsComponent;
  let fixture: ComponentFixture<InputComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponentsComponent]
    });
    fixture = TestBed.createComponent(InputComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
