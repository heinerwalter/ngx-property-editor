import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageInputComponent } from './language-input.component';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../form-group/form-group.component';
import { SelectInputComponent } from '../select-input/select-input.component';

describe('LanguageInputComponent', () => {
  let component: LanguageInputComponent;
  let fixture: ComponentFixture<LanguageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        LanguageInputComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
