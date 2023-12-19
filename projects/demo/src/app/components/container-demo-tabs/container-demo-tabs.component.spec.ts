import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDemoTabsComponent } from './container-demo-tabs.component';

describe('ContainerDemoTabsComponent', () => {
  let component: ContainerDemoTabsComponent;
  let fixture: ComponentFixture<ContainerDemoTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerDemoTabsComponent]
    });
    fixture = TestBed.createComponent(ContainerDemoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
