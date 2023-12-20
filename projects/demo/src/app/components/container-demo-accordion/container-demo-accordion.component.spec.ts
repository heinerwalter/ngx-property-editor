import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDemoAccordionComponent } from './container-demo-accordion.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('ContainerDemoAccordionComponent', () => {
  let component: ContainerDemoAccordionComponent;
  let fixture: ComponentFixture<ContainerDemoAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerDemoAccordionComponent,
      ],
      imports: [
        PropertyEditorModule,
      ],
    });
    fixture = TestBed.createComponent(ContainerDemoAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
