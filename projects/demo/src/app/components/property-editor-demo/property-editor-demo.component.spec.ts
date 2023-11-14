import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditorDemoComponent } from './property-editor-demo.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('PropertyEditorDemoComponent', () => {
  let component: PropertyEditorDemoComponent;
  let fixture: ComponentFixture<PropertyEditorDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyEditorDemoComponent,
      ],
      imports: [PropertyEditorModule],
    });
    fixture = TestBed.createComponent(PropertyEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
