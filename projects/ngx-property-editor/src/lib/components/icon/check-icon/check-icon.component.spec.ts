import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIconComponent } from './check-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('CheckIconComponent', () => {
  let component: CheckIconComponent;
  let fixture: ComponentFixture<CheckIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckIconComponent],
      imports: [NgbModule, FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(CheckIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
