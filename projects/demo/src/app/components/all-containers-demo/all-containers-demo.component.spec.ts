import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContainersDemoComponent } from './all-containers-demo.component';

describe('AllContainersDemoComponent', () => {
  let component: AllContainersDemoComponent;
  let fixture: ComponentFixture<AllContainersDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllContainersDemoComponent]
    });
    fixture = TestBed.createComponent(AllContainersDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
