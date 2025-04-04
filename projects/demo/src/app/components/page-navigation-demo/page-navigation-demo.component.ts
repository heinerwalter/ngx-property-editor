import { Component } from '@angular/core';
import { faClock, faCode, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Timeline, TimelineAlign, TimelineItemAlign } from 'ngx-property-editor';

@Component({
  selector: 'demo-page-navigation-demo',
  templateUrl: './page-navigation-demo.component.html',
  styleUrls: ['./page-navigation-demo.component.scss'],
})
export class PageNavigationDemoComponent {

  protected isReadyForStep1: boolean = true;
  protected isReadyForStep2: boolean = true;
  protected isReadyForStep3: boolean = false;

  // region Timeline

  protected iconClock: IconDefinition = faClock;
  protected iconCode: IconDefinition = faCode;

  protected readonly now: Date = new Date();

  protected timelineAlign: TimelineAlign = 'center';

  protected timelineAlignDataSource: { value: TimelineAlign, name: string }[] = [
    { value: 'left', name: 'Left' },
    { value: 'center', name: 'Center' },
    { value: 'right', name: 'Right' },
  ];

  protected timelineItemAlign: TimelineItemAlign = 'auto';

  protected timelineItemAlignDataSource: { value: TimelineItemAlign, name: string }[] = [
    { value: 'auto', name: 'Auto' },
    { value: 'left', name: 'Left' },
    { value: 'right', name: 'Right' },
  ];

  // endregion

}
