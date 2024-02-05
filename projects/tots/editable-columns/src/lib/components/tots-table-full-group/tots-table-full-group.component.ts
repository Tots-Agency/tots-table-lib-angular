import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TotsActionTable, TotsColumn, TotsTableComponent, TotsTableConfig } from '@tots/table';

@Component({
  selector: 'tots-table-full-group',
  templateUrl: './tots-table-full-group.component.html',
  styleUrls: ['./tots-table-full-group.component.css']
})
export class TotsTableFullGroupComponent {

  @ViewChild('tableComp') protected tableComp!: TotsTableComponent;

  @Input() config = new TotsTableConfig();
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 50;
  @Input() hasPagination: boolean = true;
  @Input() messageNotFound: string = "No results found, please try with other search terms";

  @Output() onAction = new EventEmitter<TotsActionTable>();

  formArrayMain?: FormArray<FormGroup>;

  protected onTableAction(action: TotsActionTable) {
    if (action.key == "init") {
      this.loadGroup();

    } else if (action.key == 'loaded-items') {
      this.loadGroup();

    } else if (action.key == 'input-create') {
      this.addInputInGroup(action.item.input, action.item.index, action.item.column);

    } else if (action.key == 'input-change') {
      this.onAction.emit(action);
      setTimeout(() => {
        this.onAction.emit({ key: 'form-change', item: { valid: this.formArrayMain!.valid, values: this.formArrayMain?.value } });
      });
      return;
    }
    this.onAction.emit(action);
  }

  private addInputInGroup(input: FormControl, index: number, column: TotsColumn) {
    let group = this.formArrayMain?.at(index);
    if(group == undefined){
      return;
    }
    group.addControl(this.getFormKey(column), input);
  }

  private loadGroup() {
    if (!this.tableComp)
      return;

    // Get Items
    let items = this.tableComp.getDataItems();

    // Create main array form
    this.formArrayMain = new FormArray<FormGroup>([]);

    // Verify if undefined
    if(items == undefined){
      return;
    }

    // Create form group for each item
    items.data.forEach(item => {
      let group = new FormGroup({});
      this.formArrayMain?.push(group);
    });
  }

  private getFormKey(column: TotsColumn): string {
    if(Array.isArray(column.field_key)){
      return column.field_key.join('_');
    } else {
      return column.field_key!;
    }
  }

  loadItems() {
    this.tableComp?.loadItems();
    //this.loadGroup();
  }
}
