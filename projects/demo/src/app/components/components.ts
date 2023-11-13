import { Type } from '@angular/core';
import { AllInputsDemoComponent } from "./all-inputs-demo/all-inputs-demo.component";
import { InputDemoWrapperComponent } from "./input-demo-wrapper/input-demo-wrapper.component";
import { TerminalComponent } from "./terminal/terminal.component";

export const components: Array<Type<any> | any[]> = [
  AllInputsDemoComponent,
  InputDemoWrapperComponent,
  TerminalComponent,
];
