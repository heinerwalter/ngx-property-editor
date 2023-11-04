import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclamationIconComponent } from './exclamation-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('ExclamationIconComponent', () => {
  let component: ExclamationIconComponent;
  let fixture: ComponentFixture<ExclamationIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExclamationIconComponent],
      imports: [NgbModule, FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(ExclamationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
