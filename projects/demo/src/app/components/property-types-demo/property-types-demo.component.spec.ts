import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypesDemoComponent } from './property-types-demo.component';
import { PropertyEditorModule } from 'ngx-property-editor/src/lib/property-editor.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('PropertyTypesDemoComponent', () => {
  let component: PropertyTypesDemoComponent;
  let fixture: ComponentFixture<PropertyTypesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PropertyEditorModule,
        FormsModule,
        FontAwesomeTestingModule,
        NgbModule,
      ],
      declarations: [PropertyTypesDemoComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PropertyTypesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
