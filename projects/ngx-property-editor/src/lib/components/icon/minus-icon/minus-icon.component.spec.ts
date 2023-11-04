import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusIconComponent } from './minus-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('MinusIconComponent', () => {
  let component: MinusIconComponent;
  let fixture: ComponentFixture<MinusIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinusIconComponent],
      imports: [NgbModule, FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(MinusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
