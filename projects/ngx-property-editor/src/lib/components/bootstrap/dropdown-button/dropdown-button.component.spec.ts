import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownButtonComponent } from './dropdown-button.component';
import { ButtonComponent } from '../button/button.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('DropdownButtonComponent', () => {
  let component: DropdownButtonComponent;
  let fixture: ComponentFixture<DropdownButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownButtonComponent,
      ],
      imports: [
        FontAwesomeTestingModule,
        NgbModule,
      ],
    });
    fixture = TestBed.createComponent(DropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
