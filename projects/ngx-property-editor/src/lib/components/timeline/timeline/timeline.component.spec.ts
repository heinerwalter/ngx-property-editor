import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimelineComponent,
        TimelineItemComponent,
      ],
      imports: [
        NgbModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
