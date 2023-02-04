import { Component } from '@angular/core';
import { TotsTableHelper } from '../../helpers/tots-table-helper';
import { TotsBaseColumnComponent } from '../tots-base-column.component';

@Component({
  selector: 'tots-icon-button-column',
  templateUrl: './icon-button-column.component.html',
  styleUrls: ['./icon-button-column.component.css']
})
export class IconButtonColumnComponent extends TotsBaseColumnComponent {

  clickButton($event: UIEvent) {
    this.onAction.next({ key: this.column.extra.action, item: this.item });
    $event.stopPropagation();
    return false;
  }

  getIconName(): any {
    return this.column.extra.icon;
  }
}
