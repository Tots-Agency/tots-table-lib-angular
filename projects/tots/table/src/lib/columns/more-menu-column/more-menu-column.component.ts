import { Component } from '@angular/core';
import { TotsBaseColumnComponent } from '../tots-base-column.component';

@Component({
  selector: 'tots-more-menu-column',
  templateUrl: './more-menu-column.component.html',
  styleUrls: ['./more-menu-column.component.scss'],
  standalone: false
})
export class MoreMenuColumnComponent extends TotsBaseColumnComponent {

  clickButton(itemAction: any, $event: UIEvent) {
    this.onAction.next({ key: itemAction.key, item: this.item });
    $event.preventDefault();
    return false;
  }
}
