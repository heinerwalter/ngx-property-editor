import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectInputComponent } from './language-select-input.component';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { SelectInputComponent } from '../../select-input/select-input.component';

describe('LanguageSelectInputComponent', () => {
  let component: LanguageSelectInputComponent;
  let fixture: ComponentFixture<LanguageSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        LanguageSelectInputComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
