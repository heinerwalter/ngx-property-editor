import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDemoPagesComponent } from './container-demo-pages.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('ContainerDemoPagesComponent', () => {
  let component: ContainerDemoPagesComponent;
  let fixture: ComponentFixture<ContainerDemoPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerDemoPagesComponent,
      ],
      imports: [
        PropertyEditorModule,
      ],
    });
    fixture = TestBed.createComponent(ContainerDemoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
