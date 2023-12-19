import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDemoPagesComponent } from './container-demo-pages.component';

describe('ContainerDemoPagesComponent', () => {
  let component: ContainerDemoPagesComponent;
  let fixture: ComponentFixture<ContainerDemoPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerDemoPagesComponent]
    });
    fixture = TestBed.createComponent(ContainerDemoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
