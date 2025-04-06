import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../button/button.component';
import { SelectInputComponent } from '../../input/select-input/select-input.component';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../input/form-group/form-group.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PaginationComponent,
        ButtonComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
      imports: [
        FormsModule,
        NgbModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
