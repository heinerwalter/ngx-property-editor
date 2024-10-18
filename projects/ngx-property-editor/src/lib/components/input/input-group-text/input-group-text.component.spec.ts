import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupTextComponent } from './input-group-text.component';

describe('InputGroupTextComponent', () => {
  let component: InputGroupTextComponent;
  let fixture: ComponentFixture<InputGroupTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputGroupTextComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputGroupTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
