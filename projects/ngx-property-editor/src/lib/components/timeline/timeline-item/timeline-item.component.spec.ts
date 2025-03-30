import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemComponent } from './timeline-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
