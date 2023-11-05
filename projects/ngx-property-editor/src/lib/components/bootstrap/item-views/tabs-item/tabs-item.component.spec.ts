import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsItemComponent } from './tabs-item.component';

describe('TabsItemComponent', () => {
  let component: TabsItemComponent;
  let fixture: ComponentFixture<TabsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsItemComponent]
    });
    fixture = TestBed.createComponent(TabsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
