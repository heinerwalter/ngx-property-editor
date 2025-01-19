import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyInputComponent } from './difficulty-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('DifficultyInputComponent', () => {
  let component: DifficultyInputComponent;
  let fixture: ComponentFixture<DifficultyInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DifficultyInputComponent,
        FormGroupComponent,
      ],
      imports: [
        NgbModule,
        FontAwesomeTestingModule,
      ],
    });
    fixture = TestBed.createComponent(DifficultyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
