import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnComponent } from './column.component';

describe('ColComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnComponent]
    });
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
