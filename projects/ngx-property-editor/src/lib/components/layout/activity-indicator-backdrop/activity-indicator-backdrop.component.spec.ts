import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityIndicatorBackdropComponent } from './activity-indicator-backdrop.component';

describe('ActivityIndicatorBackdropComponent', () => {
  let component: ActivityIndicatorBackdropComponent;
  let fixture: ComponentFixture<ActivityIndicatorBackdropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityIndicatorBackdropComponent],
    });
    fixture = TestBed.createComponent(ActivityIndicatorBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
