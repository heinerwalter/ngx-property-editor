import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageDemoComponent } from './login-page-demo.component';
import { PropertyEditorModule } from 'ngx-property-editor';

describe('LoginPageDemoComponent', () => {
  let component: LoginPageDemoComponent;
  let fixture: ComponentFixture<LoginPageDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginPageDemoComponent,
      ],
      imports: [PropertyEditorModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
