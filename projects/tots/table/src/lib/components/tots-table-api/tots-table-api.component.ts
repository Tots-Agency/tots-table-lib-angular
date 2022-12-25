import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TotsActionTable } from '../../entities/tots-action-table';
import { TotsTableApiConfig } from '../../entities/tots-table-api-config';
import { TotsTableConfig } from '../../entities/tots-table-config';
import { TotsTableComponent } from '../tots-table/tots-table.component';

@Component({
  selector: 'tots-table-api',
  templateUrl: './tots-table-api.component.html',
  styleUrls: ['./tots-table-api.component.scss']
})
export class TotsTableApiComponent implements OnInit {
  
  @ViewChild('tableComp') tableComp!: TotsTableComponent;

  @Input() config = new TotsTableApiConfig();
  @Input() hasPagination: boolean = true;

  @Output() onAction = new EventEmitter<TotsActionTable>();

  configTable = new TotsTableConfig();

  ngOnInit(): void {
    this.loadConfig();
  }

  onTableAction(action: TotsActionTable) {
    if(action.key == 'page-change'){
      this.config.query.per_page = action.item.pageSize;
      this.config.query.page = action.item.pageIndex;
    }

    this.onAction.emit(action);
  }

  loadConfig() {
    this.configTable.id = this.config.id;
    this.configTable.columns = this.config.columns;
    this.configTable.obs = this.config.service.list(this.config.query);
  }

  loadItems() {
    this.tableComp.loadItems();
  }
}
