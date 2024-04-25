import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndEditContainerComponent } from './view-and-edit-container.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { ButtonGroupComponent } from '../../bootstrap/button-group/button-group.component';
import { ButtonComponent } from '../../bootstrap/button/button.component';

describe('ViewAndEditContainerComponent', () => {
  let component: ViewAndEditContainerComponent;
  let fixture: ComponentFixture<ViewAndEditContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewAndEditContainerComponent,
        ButtonGroupComponent,
        ButtonComponent,
      ],
      imports: [FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(ViewAndEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
