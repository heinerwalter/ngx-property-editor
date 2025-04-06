import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from 'projects/ngx-property-editor/src/public-api';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../input/form-group/form-group.component';
import { SelectInputComponent } from '../../input/select-input/select-input.component';
import { ButtonComponent } from '../../bootstrap/button/button.component';
import { ButtonGroupComponent } from '../../bootstrap/button-group/button-group.component';
import { NumberInputComponent } from '../../input/number-input/number-input.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
        PaginationComponent,
        SelectInputComponent,
        NumberInputComponent,
        FormGroupComponent,
        ButtonComponent,
        ButtonGroupComponent,
      ],
      imports: [
        FormsModule,
        NgbModule,
      ],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
