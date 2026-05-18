import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropHandleComponent } from './drag-drop-handle.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { AppServicesTestingModule } from '../../../services/app-services-testing.module.spec';

describe('DragDropHandleComponent', () => {
  let component: DragDropHandleComponent;
  let fixture: ComponentFixture<DragDropHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppServicesTestingModule,
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
