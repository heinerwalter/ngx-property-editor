import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRowFormGroupComponent } from './multi-row-form-group.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { PlusIconComponent } from '../../icon/plus-icon/plus-icon.component';
import { MinusIconComponent } from '../../icon/minus-icon/minus-icon.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('MultiRowFormGroupComponent', () => {
  let component: MultiRowFormGroupComponent;
  let fixture: ComponentFixture<MultiRowFormGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiRowFormGroupComponent,
        FormGroupComponent,
        PlusIconComponent,
        MinusIconComponent,
      ],
      imports: [
        NgbTooltipModule,
        FontAwesomeTestingModule,
      ]
    });
    fixture = TestBed.createComponent(MultiRowFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
