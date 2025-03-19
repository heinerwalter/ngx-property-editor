import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorIconComponent } from './color-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('ColorIconComponent', () => {
  let component: ColorIconComponent;
  let fixture: ComponentFixture<ColorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorIconComponent],
      imports: [
       NgbModule,
       FontAwesomeTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
