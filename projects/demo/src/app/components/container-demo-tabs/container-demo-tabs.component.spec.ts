import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDemoTabsComponent } from './container-demo-tabs.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('ContainerDemoTabsComponent', () => {
  let component: ContainerDemoTabsComponent;
  let fixture: ComponentFixture<ContainerDemoTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerDemoTabsComponent,
      ],
      imports: [
        PropertyEditorModule,
      ],
    });
    fixture = TestBed.createComponent(ContainerDemoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
