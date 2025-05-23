import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTableComponent } from './property-table.component';
import { FormsModule } from '@angular/forms';
import { inputComponents } from '../../input/input.components';
import { TableComponent } from '../table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ButtonComponent } from '../../bootstrap/button/button.component';
import { TableColumnChooserComponent } from '../table-column-chooser/table-column-chooser.component';
import { MovableModalComponent } from '../../modal/movable-modal/movable-modal.component';
import { BooleanInputComponent } from '../../input/boolean-input/boolean-input.component';
import { bootstrapComponents } from '../../bootstrap/bootstrap.components';
import { iconComponents } from '../../icon/icon.components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('PropertyTableComponent', () => {
  let component: PropertyTableComponent;
  let fixture: ComponentFixture<PropertyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PropertyTableComponent,
        TableComponent,
        TableColumnChooserComponent,
        MovableModalComponent,
        ToolbarComponent,
        ...bootstrapComponents,
        ...iconComponents,
        ...inputComponents,
      ],
      imports: [
        FormsModule,
        NgbModule,
        FontAwesomeModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
