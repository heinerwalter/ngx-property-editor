import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIconComponent } from './info-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('InfoIconComponent', () => {
  let component: InfoIconComponent;
  let fixture: ComponentFixture<InfoIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoIconComponent],
      imports: [NgbModule, FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(InfoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
