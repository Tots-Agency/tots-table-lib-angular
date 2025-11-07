import { Component } from '@angular/core';
import { TotsBaseColumnComponent } from '../tots-base-column.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'tots-checkbox-column',
	templateUrl: './checkbox-column.component.html',
	styleUrls: ['./checkbox-column.component.css'],
	standalone: false
})
export class CheckboxColumnComponent extends TotsBaseColumnComponent {

  onChange(event: MatCheckboxChange) {
    let key = 'select-item';
    if(!event.checked){
      key = 'unselect-item';
    }
    this.onAction.next({ key: key, item: this.item });
  }

	protected get cssClass() : string {
		return this.column.extra?.class || "";
	}
	protected get color() : string {
		return this.column.extra?.color || "";
	}
}
