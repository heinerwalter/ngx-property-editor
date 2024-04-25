import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsItemComponent } from './tabs-item.component';

describe('TabsItemComponent', () => {
  let component: TabsItemComponent;
  let fixture: ComponentFixture<TabsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsItemComponent],
    });
  });

  it('should not create', () => {
    // Item cannot be created outside the items view container
    expect(() => {
      fixture = TestBed.createComponent(TabsItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }).toThrowError();
  });
});
