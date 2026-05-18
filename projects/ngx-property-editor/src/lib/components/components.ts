import {Type} from '@angular/core';
import {bootstrapComponents} from './bootstrap/bootstrap.components';
import {hierarchyComponents} from "./hierarchy/hierarchy.components";
import {iconComponents} from './icon/icon.components';
import {inputComponents} from './input/input.components';
import {layoutComponents} from './layout/layout.components';
import {modalComponents} from './modal/modal.components';
import {propertyTableComponents} from './property-table/property-table.components';
import {propertyViewComponents} from './property-views/property-views.components';
import {timelineComponents} from './timeline/timeline.components';

export const components: Array<Type<any> | any[]> = [
  ...bootstrapComponents,
  ...hierarchyComponents,
  ...iconComponents,
  ...inputComponents,
  ...layoutComponents,
  ...modalComponents,
  ...propertyTableComponents,
  ...propertyViewComponents,
  ...timelineComponents,
];
