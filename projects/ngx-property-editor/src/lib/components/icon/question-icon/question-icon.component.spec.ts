import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionIconComponent } from './question-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('QuestionIconComponent', () => {
  let component: QuestionIconComponent;
  let fixture: ComponentFixture<QuestionIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionIconComponent],
      imports: [NgbModule],
    });
    fixture = TestBed.createComponent(QuestionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
