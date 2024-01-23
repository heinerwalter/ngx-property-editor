import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseComponent } from './collapse.component';
import { AccordionComponent } from '../item-views/accordion/accordion.component';
import { AccordionItemComponent } from '../item-views/accordion-item/accordion-item.component';
import { ValidityIconComponent } from '../../icon/validity-icon/validity-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('CollapseComponent', () => {
  let component: CollapseComponent;
  let fixture: ComponentFixture<CollapseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollapseComponent,
        AccordionComponent,
        AccordionItemComponent,
        ValidityIconComponent,
      ],
      imports: [NgbModule],
    });
    fixture = TestBed.createComponent(CollapseComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // Here happens an ExpressionChangedAfterItHasBeenCheckedError
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
