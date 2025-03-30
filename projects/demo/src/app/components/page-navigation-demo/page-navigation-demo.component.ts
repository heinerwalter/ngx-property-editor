import { Component } from '@angular/core';
import { Timeline } from 'ngx-property-editor';

@Component({
  selector: 'demo-page-navigation-demo',
  templateUrl: './page-navigation-demo.component.html',
  styleUrls: ['./page-navigation-demo.component.scss'],
})
export class PageNavigationDemoComponent {

  protected isReadyForStep1: boolean = true;
  protected isReadyForStep2: boolean = true;
  protected isReadyForStep3: boolean = false;

  protected timelineData: Timeline = [
    { title: 'Item 1', text: 'This is the first timeline item with a text.' },
    { title: 'Item 2', text: 'This is another timeline item with an even longer text below the timeline item title. It consists of multiple sentences so that it hopefully spans across multiple lines. The timeline works.' },
    { title: 'Item 3', text: 'Just that.' },
    { title: 'Item 4' },
    { title: 'Item 5', text: 'And this is the last timeline item.' },
  ];

}
