import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndEditContainerComponent } from './view-and-edit-container.component';

describe('ViewAndEditContainerComponent', () => {
  let component: ViewAndEditContainerComponent;
  let fixture: ComponentFixture<ViewAndEditContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAndEditContainerComponent]
    });
    fixture = TestBed.createComponent(ViewAndEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
