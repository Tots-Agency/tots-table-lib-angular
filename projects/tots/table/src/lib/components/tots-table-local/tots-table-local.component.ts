import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TotsTableLocalConfig } from '../../entities/tots-table-local-config';
import { TotsActionTable } from '../../entities/tots-action-table';
import { TotsListResponse } from '@tots/core';
import { Observable, tap } from 'rxjs';
import { TotsTableComponent } from '../tots-table/tots-table.component';

@Component({
  selector: 'tots-table-local',
  templateUrl: './tots-table-local.component.html',
  styleUrls: ['./tots-table-local.component.css']
})
export class TotsTableLocalComponent {

  @ViewChild('tableComp') tableComp!: TotsTableComponent;

  @Input() configTable = new TotsTableLocalConfig();
  @Input() hasPagination: boolean = true;
  @Input() isPaginationStartIndexInZero: boolean = false;

  @Output() onAction = new EventEmitter<TotsActionTable>();

  dataItems?: Array<any>;
  page: number = 1;
  perPage: number = 50;

  ngOnInit(): void {
    this.loadConfig();
  }

  onFilterItems() {
    if(this.dataItems == undefined){
      return;
    }

    let startIndex = (this.page - 1) * this.perPage;
    let endIndex = startIndex + this.perPage;
    this.setDataItems(this.generateListResponse(this.dataItems.slice(startIndex, endIndex)));
  }

  onTableAction(action: TotsActionTable) {
    if(action.key == 'page-change'){
      this.perPage = action.item.pageSize;
      if(this.isPaginationStartIndexInZero){
        this.page = action.item.pageIndex;
      } else {
        this.page = action.item.pageIndex + 1;
      }
      this.onFilterItems();
    }

    this.onAction.emit(action);
  }

  loadConfig() {
    if(this.configTable.obs == undefined){
      return;
    }
    this.setObs(this.configTable.obs);
  }

  refreshQueryAndLoadItems() {
    return this.loadItems();
  }

  loadItems() {
    return this.tableComp.loadItems();
  }

  getDataItems(): TotsListResponse<any> | undefined {
    return this.tableComp.getDataItems();
  }

  setDataItems(items: TotsListResponse<any>) {
    this.tableComp.refreshDataItems(items);
  }

  setObs(obs: Observable<TotsListResponse<any>>) {
    this.configTable.obs = obs.pipe(tap(res => this.dataItems = res.data));
  }

  generateListResponse(items: Array<any>): TotsListResponse<any> {
    // calcular la iultima pagina
    let lastPage = Math.ceil(this.dataItems!.length / this.perPage);

    return {
      current_page: this.page,
      first_page_url: '',
      from: '',
      last_page: lastPage,
      last_page_url: '',
      next_page_url: '',
      path: '',
      per_page: this.perPage,
      prev_page_url: '',
      to: '',
      total: this.dataItems!.length,
      data: items
    };
  }
}
