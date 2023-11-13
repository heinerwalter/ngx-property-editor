import { Type } from '@angular/core';
import { AllContainersDemoComponent } from "./all-containers-demo/all-containers-demo.component";
import { AllInputsDemoComponent } from "./all-inputs-demo/all-inputs-demo.component";
import { InputDemoWrapperComponent } from "./input-demo-wrapper/input-demo-wrapper.component";
import { PropertyEditorDemoComponent } from "./property-editor-demo/property-editor-demo.component";
import { TerminalComponent } from "./terminal/terminal.component";

export const components: Array<Type<any> | any[]> = [
  AllContainersDemoComponent,
  AllInputsDemoComponent,
  InputDemoWrapperComponent,
  PropertyEditorDemoComponent,
  TerminalComponent,
];
