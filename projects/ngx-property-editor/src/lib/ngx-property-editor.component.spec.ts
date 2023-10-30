import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPropertyEditorComponent } from './ngx-property-editor.component';

describe('NgxPropertyEditorComponent', () => {
  let component: NgxPropertyEditorComponent;
  let fixture: ComponentFixture<NgxPropertyEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxPropertyEditorComponent]
    });
    fixture = TestBed.createComponent(NgxPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
