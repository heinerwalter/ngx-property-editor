import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyInputComponent } from './hierarchy-input.component';
import { AppServicesTestingModule } from '../../../services/app-services-testing.module.spec';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { DragDropHandleComponent } from '../drag-drop-handle/drag-drop-handle.component';

describe('HierarchyInputComponent', () => {
  let component: HierarchyInputComponent;
  let fixture: ComponentFixture<HierarchyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppServicesTestingModule,
        FontAwesomeTestingModule,
      ],
      declarations: [
        HierarchyInputComponent,
        DragDropHandleComponent,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HierarchyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
