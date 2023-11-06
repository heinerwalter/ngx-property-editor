import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidityIconComponent } from '../../../icon/validity-icon/validity-icon.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionComponent,
        ValidityIconComponent,
      ],
      imports: [NgbModule],
    });
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
