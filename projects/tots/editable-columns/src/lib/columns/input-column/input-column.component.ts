import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { TotsBaseColumnComponent, TotsTableHelper } from '@tots/table';

@Component({
  selector: 'tots-input-column',
  templateUrl: './input-column.component.html',
  styleUrls: ['./input-column.component.css']
})
export class InputColumn extends TotsBaseColumnComponent {

  input!: FormControl;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loadInput();
    this.loadForm();
    this.loadChanges();
  }

  loadChanges() {
    this.input.valueChanges
    .subscribe(res => {
      this.onAction.next({ key: 'input-change', item: { field_key: this.getFormKey(), item: this.item, value: res, valid: this.input.valid } });
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

  loadInput() {
    let value = TotsTableHelper.getItemValueByKey(this.item, this.column.field_key);
    this.input = new FormControl(value, this.getValidators());
  }

  getFormKey(): string {
    if(Array.isArray(this.column.field_key)){
      return this.column.field_key.join('_');
    } else {
      return this.column.field_key!;
    }
  }

  getValidators() : ValidatorFn[] | ValidatorFn | null {
    if (this.column.extra && this.column.extra.validators) {
      return this.column.extra.validators;
    }
    return null;
  }

  getErrorMessage() : string {
    if (!this.column.extra.errors) {
      return '';
    }

    for (const error of this.column.extra.errors) {
      if (this.input.hasError(error.name)) {
        return error.message;
      }
    }

    return '';
  }

  getAppearance() : MatFormFieldAppearance {
    if (this.column.extra && this.column.extra.appearance) {
      return this.column.extra.appearance;
    }
    return 'fill';
  }

  getLabel() : string | undefined {
    if (this.column.extra && this.column.extra.label) {
      return this.column.extra.label;
    }
    return undefined;
  }

  getClasses() : string {
    if (this.column.extra && this.column.extra.classes) {
      return this.column.extra.classes;
    }
    return '';
  }

  getPlaceholder() : string {
    if (this.column.extra && this.column.extra.placeholder) {
      return this.column.extra.placeholder;
    }
    return '';
  }

  getCaption() : string {
    if (this.column.extra && this.column.extra.caption) {
      return this.column.extra.caption;
    }
    return '';
  }

  hasError() : boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

  getInput() {
    return this.input;
  }
}
