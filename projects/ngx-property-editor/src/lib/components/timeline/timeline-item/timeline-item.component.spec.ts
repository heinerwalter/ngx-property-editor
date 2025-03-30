import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemComponent } from './timeline-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('TimelineItemComponent', () => {
  let component: TimelineItemComponent;
  let fixture: ComponentFixture<TimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimelineItemComponent,
      ],
      imports: [
        NgbModule,
        FontAwesomeTestingModule,
      ],
    })
    .compileComponents();
  });

  it('should not create', () => {
    // Item cannot be created outside the timeline component
    expect(() => {
      fixture = TestBed.createComponent(TimelineItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }).toThrowError();
  });
});
