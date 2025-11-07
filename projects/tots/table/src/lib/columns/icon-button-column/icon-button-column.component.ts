import { Component } from '@angular/core';
import { TotsBaseColumnComponent } from '../tots-base-column.component';

@Component({
  selector: 'tots-icon-button-column',
  templateUrl: './icon-button-column.component.html',
  styleUrls: ['./icon-button-column.component.css'],
  standalone: false
})
export class IconButtonColumnComponent extends TotsBaseColumnComponent {

  clickButton($event: UIEvent) {
    this.onAction.next({ key: this.column.extra.action, item: this.item });
    $event.stopPropagation();
    return false;
  }

  getIconName() : string {
    return this.column.extra.icon;
  }

	protected get buttonColor() : string {
		return this.column.extra.matColor || "";
	}
	protected get cssClass() : string {
		return this.column.extra.class || "";
	}
}
