import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoIconComponent } from './goto-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('GotoIconComponent', () => {
  let component: GotoIconComponent;
  let fixture: ComponentFixture<GotoIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GotoIconComponent],
      imports: [NgbModule],
    });
    fixture = TestBed.createComponent(GotoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
