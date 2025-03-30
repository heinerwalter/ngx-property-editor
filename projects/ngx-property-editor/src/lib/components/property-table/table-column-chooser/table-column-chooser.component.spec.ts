import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnChooserComponent } from './table-column-chooser.component';
import { MovableModalComponent } from '../../modal/movable-modal/movable-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooleanInputComponent } from 'ngx-property-editor';

describe('TableColumnChooserComponent', () => {
  let component: TableColumnChooserComponent;
  let fixture: ComponentFixture<TableColumnChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TableColumnChooserComponent,
        MovableModalComponent,
        BooleanInputComponent,
      ],
      imports: [
        FormsModule,
        NgbModule,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableColumnChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
