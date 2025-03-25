import { PropertyConfiguration } from '../property-views/property-configuration';

/**
 * Definition of a visible column of the `PropertyTableComponent`.
 */
export type PropertyTableColumn = {
  property: PropertyConfiguration;
  parent: PropertyTableColumn | undefined;
  isGroup: boolean;
  children: PropertyTableColumn[];
  isVisible: boolean;
};
