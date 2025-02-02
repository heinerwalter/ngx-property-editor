import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTableDemoComponent } from './property-table-demo.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('PropertyTableDemoComponent', () => {
  let component: PropertyTableDemoComponent;
  let fixture: ComponentFixture<PropertyTableDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PropertyTableDemoComponent,
      ],
      imports: [PropertyEditorModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyTableDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
