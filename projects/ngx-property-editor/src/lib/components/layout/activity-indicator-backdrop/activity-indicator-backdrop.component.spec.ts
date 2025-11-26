import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityIndicatorBackdropComponent } from './activity-indicator-backdrop.component';
import { AppServicesTestingModule } from '../../../services/app-services-testing.module.spec';

describe('ActivityIndicatorBackdropComponent', () => {
  let component: ActivityIndicatorBackdropComponent;
  let fixture: ComponentFixture<ActivityIndicatorBackdropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppServicesTestingModule],
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
