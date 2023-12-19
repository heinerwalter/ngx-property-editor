import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-navigation-demo',
  templateUrl: './page-navigation-demo.component.html',
  styleUrls: ['./page-navigation-demo.component.scss'],
})
export class PageNavigationDemoComponent {

  public isReadyForStep1: boolean = true;
  public isReadyForStep2: boolean = true;
  public isReadyForStep3: boolean = false;

}
