import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadIconComponent } from './reload-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('ReloadIconComponent', () => {
  let component: ReloadIconComponent;
  let fixture: ComponentFixture<ReloadIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReloadIconComponent],
      imports: [NgbModule, FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(ReloadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
