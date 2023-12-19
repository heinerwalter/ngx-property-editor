import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigationDemoComponent } from './page-navigation-demo.component';

describe('PageNavigationDemoComponent', () => {
  let component: PageNavigationDemoComponent;
  let fixture: ComponentFixture<PageNavigationDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNavigationDemoComponent]
    });
    fixture = TestBed.createComponent(PageNavigationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
