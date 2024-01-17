import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayFormGroupComponent } from './array-form-group.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { PlusIconComponent } from '../../icon/plus-icon/plus-icon.component';
import { MinusIconComponent } from '../../icon/minus-icon/minus-icon.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('ArrayFormGroupComponent', () => {
  let component: ArrayFormGroupComponent;
  let fixture: ComponentFixture<ArrayFormGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArrayFormGroupComponent,
        FormGroupComponent,
        PlusIconComponent,
        MinusIconComponent,
      ],
      imports: [
        NgbTooltipModule,
        FontAwesomeTestingModule,
      ]
    });
    fixture = TestBed.createComponent(ArrayFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
