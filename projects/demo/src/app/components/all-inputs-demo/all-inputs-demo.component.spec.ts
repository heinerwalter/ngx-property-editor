import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInputsDemoComponent } from './all-inputs-demo.component';
import { InputDemoWrapperComponent } from '../input-demo-wrapper/input-demo-wrapper.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('AllInputsDemoComponent', () => {
  let component: AllInputsDemoComponent;
  let fixture: ComponentFixture<AllInputsDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AllInputsDemoComponent,
        InputDemoWrapperComponent,
      ],
      imports: [PropertyEditorModule],
    });
    fixture = TestBed.createComponent(AllInputsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
