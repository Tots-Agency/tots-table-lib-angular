import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TotsTableLocalConfig } from '../../entities/tots-table-local-config';
import { TotsActionTable } from '../../entities/tots-action-table';
import { TotsListResponse } from '@tots/core';
import { Observable, tap } from 'rxjs';
import { TotsTableComponent } from '../tots-table/tots-table.component';
import { TotsColumn } from '../../entities/tots-column';

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
  dataTotals = 0;
  page: number = 1;
  perPage: number = 50;
  orderKey?: string;
  orderType?: string;
  searchQuery?: string;

  ngOnInit(): void {
    this.loadConfig();
  }

  onFilterItems() {
    if(this.dataItems == undefined){
      return;
    }

    let items = [...this.dataItems];

    if(this.orderKey != undefined){
      if(this.orderType == 'asc'){
        items = items.sort((a,b) => (a[this.orderKey!] > b[this.orderKey!]) ? 1 : ((b[this.orderKey!] > a[this.orderKey!]) ? -1 : 0))
      } else {
        items = items.sort((a,b) => (a[this.orderKey!] < b[this.orderKey!]) ? 1 : ((b[this.orderKey!] < a[this.orderKey!]) ? -1 : 0))
      }
    }

    // Aplicar busqueda
    if(this.searchQuery != undefined && this.searchQuery != ''){
      items = items.filter(item => {
        let isMatch = false;
        this.configTable.searchKeys.forEach(key => {
          if(item[key] != undefined && item[key].toString().toLowerCase().includes(this.searchQuery!.toLowerCase())){
            isMatch = true;
          }
        });
        return isMatch;
      });
      this.dataTotals = items.length;
    } else {
      this.dataTotals = this.dataItems!.length;
    }

    let startIndex = (this.page - 1) * this.perPage;
    let endIndex = startIndex + this.perPage;
    this.setDataItems(this.generateListResponse(items.slice(startIndex, endIndex)));
  }

  onPagination(action: TotsActionTable) {
    this.perPage = action.item.pageSize;
    if(this.isPaginationStartIndexInZero){
      this.page = action.item.pageIndex;
    } else {
      this.page = action.item.pageIndex + 1;
    }
    this.onFilterItems();
  }

  onOrder(column: TotsColumn) {
    this.orderType = column.order;
    this.orderKey = column.field_key as string;
    this.onFilterItems();
  }

  onTableAction(action: TotsActionTable) {
    if(action.key == 'page-change'){
      this.onPagination(action);
    } else if(action.key == 'click-order'){
      this.onOrder(action.item);
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

  onSearch(query: string) {
    this.page = 1;
    this.searchQuery = query;
    this.onFilterItems();
  }

  generateListResponse(items: Array<any>): TotsListResponse<any> {
    // calcular la iultima pagina
    let lastPage = Math.ceil(this.dataTotals / this.perPage);

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
      total: this.dataTotals,
      data: items
    };
  }
}
