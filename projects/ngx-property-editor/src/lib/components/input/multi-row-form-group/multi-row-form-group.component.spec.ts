import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRowFormGroupComponent } from './multi-row-form-group.component';

describe('MultiRowFormGroupComponent', () => {
  let component: MultiRowFormGroupComponent;
  let fixture: ComponentFixture<MultiRowFormGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiRowFormGroupComponent]
    });
    fixture = TestBed.createComponent(MultiRowFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
