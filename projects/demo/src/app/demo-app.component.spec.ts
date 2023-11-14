import { TestBed } from '@angular/core/testing';
import { DemoAppComponent } from './demo-app.component';
import { PropertyEditorModule } from 'ngx-property-editor';
import { DemoAppModule } from './demo-app.module';

describe('DemoAppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [DemoAppComponent],
    imports: [
      DemoAppModule,
      PropertyEditorModule,
    ],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DemoAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as initial containerType 'tabs'`, () => {
    const fixture = TestBed.createComponent(DemoAppComponent);
    const app = fixture.componentInstance;
    expect((app as any).containerType).toEqual('tabs');
  });

  it('should render toolbar', () => {
    const fixture = TestBed.createComponent(DemoAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar span')?.textContent).toContain('Welcome to the ngx-property-editor Demo');
  });
});
