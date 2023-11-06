import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TotsBaseColumnComponent } from '@tots/table';

@Component({
  selector: 'tots-input-column',
  templateUrl: './input-column.component.html',
  styleUrls: ['./input-column.component.css']
})
export class InputColumn extends TotsBaseColumnComponent {

  input = new FormControl();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadChanges();
  }

  loadChanges() {
    this.input.valueChanges
    .subscribe(res => {
      this.onAction.next({ key: 'input-change', item: { field_key: this.getFormKey(), item: this.item, value: res } });
    });
  }

  loadForm() {
    if(this.column.extra == undefined || this.column.extra.group == undefined){
      return;
    }

    let group: FormGroup = this.column.extra.group;
    if(group.get(this.getFormKey()) != undefined){
        return;
    }

    group.addControl(this.getFormKey(), this.input);
  }

  getFormKey(): string {
    if(Array.isArray(this.column.field_key)){
      return this.column.field_key.join('_');
    } else {
      return this.column.field_key!;
    }
  }
}
