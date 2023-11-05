import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidityIconComponent } from './validity-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ValidityIconComponent', () => {
  let component: ValidityIconComponent;
  let fixture: ComponentFixture<ValidityIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidityIconComponent],
      imports: [NgbModule, FontAwesomeModule],
    });
    fixture = TestBed.createComponent(ValidityIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
