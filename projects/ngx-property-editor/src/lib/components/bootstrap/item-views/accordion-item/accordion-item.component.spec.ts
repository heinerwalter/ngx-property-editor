import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let component: AccordionItemComponent;
  let fixture: ComponentFixture<AccordionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionItemComponent],
    });
  });

  it('should not create', () => {
    // Item cannot be created outside the items view container
    expect(() => {
      fixture = TestBed.createComponent(AccordionItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }).toThrowError();
  });
});
