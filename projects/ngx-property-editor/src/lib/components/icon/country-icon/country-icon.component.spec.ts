import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryIconComponent } from './country-icon.component';

describe('CountryIconComponent', () => {
  let component: CountryIconComponent;
  let fixture: ComponentFixture<CountryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CountryIconComponent,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
