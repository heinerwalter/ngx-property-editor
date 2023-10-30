import { TestBed } from '@angular/core/testing';

import { NgxPropertyEditorService } from './ngx-property-editor.service';

describe('NgxPropertyEditorService', () => {
  let service: NgxPropertyEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPropertyEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
