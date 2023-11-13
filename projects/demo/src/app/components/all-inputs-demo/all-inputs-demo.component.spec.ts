import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInputsDemoComponent } from './all-inputs-demo.component';

describe('AllInputsDemoComponent', () => {
  let component: AllInputsDemoComponent;
  let fixture: ComponentFixture<AllInputsDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllInputsDemoComponent]
    });
    fixture = TestBed.createComponent(AllInputsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
