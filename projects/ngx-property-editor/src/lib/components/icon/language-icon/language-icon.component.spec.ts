import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageIconComponent } from './language-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('LanguageIconComponent', () => {
  let component: LanguageIconComponent;
  let fixture: ComponentFixture<LanguageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageIconComponent],
      import: [
       NgbModule,
       FontAwesomeTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
