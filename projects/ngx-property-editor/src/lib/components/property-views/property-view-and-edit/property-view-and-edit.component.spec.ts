import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditorModule } from '../../../property-editor.module';

describe('PropertyViewAndEditComponent', () => {
  let component: PropertyViewAndEditComponent;
  let fixture: ComponentFixture<PropertyViewAndEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PropertyEditorModule],
    });
    fixture = TestBed.createComponent(PropertyViewAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
