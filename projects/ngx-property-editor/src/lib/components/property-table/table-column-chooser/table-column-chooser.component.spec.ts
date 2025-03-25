import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnChooserComponent } from './table-column-chooser.component';

describe('TableColumnChooserComponent', () => {
  let component: TableColumnChooserComponent;
  let fixture: ComponentFixture<TableColumnChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColumnChooserComponent]
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
