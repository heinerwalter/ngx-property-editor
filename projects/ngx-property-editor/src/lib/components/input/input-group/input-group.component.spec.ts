import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupComponent } from './input-group.component';

describe('InputGroupComponent', () => {
  let component: InputGroupComponent;
  let fixture: ComponentFixture<InputGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputGroupComponent],
    });
    fixture = TestBed.createComponent(InputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
