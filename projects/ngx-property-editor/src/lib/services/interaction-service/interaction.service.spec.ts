import { TestBed } from '@angular/core/testing';

import { InteractionService } from './interaction.service';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

describe('InteractionService', () => {
  let service: InteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // Angular modules:
        RouterModule.forRoot([], { useHash: true }), // Angular Router
        // 3rd party modules:
        ToastrModule.forRoot(), // Toastr
        SweetAlert2Module.forRoot(), // SweetAlert2 for Angular
      ],
    });
    service = TestBed.inject(InteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
