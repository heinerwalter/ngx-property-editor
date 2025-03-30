import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableModalComponent } from './movable-modal.component';

describe('MovableModalComponent', () => {
  let component: MovableModalComponent;
  let fixture: ComponentFixture<MovableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MovableModalComponent,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
