import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMarkIconComponent } from './xmark-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('XmarkIconComponent', () => {
  let component: XMarkIconComponent;
  let fixture: ComponentFixture<XMarkIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XMarkIconComponent],
      imports: [NgbModule, FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(XMarkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
