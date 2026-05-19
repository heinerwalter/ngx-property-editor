import {Component} from '@angular/core';
import {VersionInfo} from "ngx-property-editor";

@Component({
  selector: 'demo-login-page-demo',
  templateUrl: './login-page-demo.component.html',
  styleUrls: ['./login-page-demo.component.scss'],
})
export class LoginPageDemoComponent {

  protected readonly versionInfo: VersionInfo = new VersionInfo({
    version: '1.0.0',
    buildDate: new Date(),
  });

}
