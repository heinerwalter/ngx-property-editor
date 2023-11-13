import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesItemComponent } from './pages-item.component';

describe('PagesItemComponent', () => {
  let component: PagesItemComponent;
  let fixture: ComponentFixture<PagesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesItemComponent]
    });
  });

  it('should not create', () => {
    // Item cannot be created outside the items view container
    expect(() => {
      fixture = TestBed.createComponent(PagesItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }).toThrowError();
  });
});
