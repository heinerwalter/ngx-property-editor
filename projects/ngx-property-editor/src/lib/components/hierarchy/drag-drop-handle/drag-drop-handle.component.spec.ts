import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropHandleComponent } from './drag-drop-handle.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('DragDropHandleComponent', () => {
  let component: DragDropHandleComponent;
  let fixture: ComponentFixture<DragDropHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
      ],
      declarations: [
        DragDropHandleComponent,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DragDropHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
