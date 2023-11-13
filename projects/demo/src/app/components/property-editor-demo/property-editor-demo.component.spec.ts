import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditorDemoComponent } from './property-editor-demo.component';

describe('PropertyEditorDemoComponent', () => {
  let component: PropertyEditorDemoComponent;
  let fixture: ComponentFixture<PropertyEditorDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyEditorDemoComponent]
    });
    fixture = TestBed.createComponent(PropertyEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
