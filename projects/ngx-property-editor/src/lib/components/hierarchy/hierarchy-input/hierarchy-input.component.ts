import {Component} from '@angular/core';

import {Hierarchy, HierarchyController, HierarchyItem} from '../hierarchy';
import {InputBaseWithValue} from "../../input/input-base";

/**
 * A view for a hierarchical structure like a directory structure.
 * The `Hierarchy` array can be assigned to the property `value`.
 *
 * Entries are displayed in lines or a vertical list.
 * Nested entries are indented.
 *
 * Example:
 *
 * + Root item 1
 *   + Nested item 1.1
 *   + Nested item 1.2
 *     + Further nested item 1.2.1
 * + Root item 2
 * + Root item 3
 */
@Component({
  selector: 'pe-hierarchy-input',
  templateUrl: './hierarchy-input.component.html',
  styleUrl: './hierarchy-input.component.scss',
})
export class HierarchyInputComponent extends InputBaseWithValue<Hierarchy> {

  /**
   * Called when one of the arrow icons of a drag-and-drop handle was clicked by the user.
   * @param item The hierarchy item on which the drag-and-drop handle was clicked.
   * @param array Array of hierarchy items in which the item is located.
   * @param index Index of the given `item` in the given `array`.
   * @param direction Arrow direction ('up', 'down', 'left', 'right').
   * @param parentArray Array of hierarchy items in which the item parent is located.
   * @param parentIndex Index of the parent of the given `item` (`item.parent`) in the given `parentArray`.
   */
  protected onDragDropArrowClicked(direction: 'up' | 'down' | 'left' | 'right',
                                   item: HierarchyItem,
                                   array: HierarchyItem[],
                                   index: number,
                                   parentArray: HierarchyItem[] | undefined,
                                   parentIndex: number | undefined): void {
    if (!item) return;

    switch (direction) {
      case 'up':
        if (!array?.length || index - 1 < 0) return;
        array[index] = array[index - 1];
        array[index - 1] = item;
        break;

      case 'down':
        if (!array?.length || index + 1 >= array.length) return;
        array[index] = array[index + 1];
        array[index + 1] = item;
        break;

      case 'left': {
        if (!parentArray?.length || parentIndex == undefined) return;
        const newParentArray = [
          ...parentArray.slice(0, parentIndex + 1),
          item,
          ...parentArray.slice(parentIndex + 1),
        ];
        parentArray.splice(0, parentArray.length, ...newParentArray);
        item.parent = item.parent?.parent;
        array.splice(index, 1);
        break;
      }

      case 'right': {
        if (!array?.length || index - 1 < 0) return;
        const newParentItem = array[index - 1];
        if (!newParentItem.children)
          newParentItem.children = [];
        newParentItem.children.push(item);
        array.splice(index, 1);
        break;
      }
    }

    HierarchyController.assignNewOrderToHierarchyItems(direction == 'left' ? parentArray || [] : array);
    this.emitValueChange(this.value);
  }

}
