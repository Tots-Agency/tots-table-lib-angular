import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TotsListResponse } from '@tots/core';
import { Subject, tap } from 'rxjs';
import { TotsActionTable } from '../../entities/tots-action-table';
import { TotsColumn } from '../../entities/tots-column';
import { TotsTableConfig } from '../../entities/tots-table-config';
import { MatPaginator } from '@angular/material/paginator';
import { TOTS_TABLE_DEFAULT_CONFIG, TotsTableDefaultConfig } from '../../entities/tots-table-default-config';

@Component({
  selector: 'tots-table',
  templateUrl: './tots-table.component.html',
  styleUrls: ['./tots-table.component.scss'],
})
export class TotsTableComponent implements OnInit, AfterViewInit {

  @Input() config = new TotsTableConfig();
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 50;
  @Input() hasPagination: boolean = true;
  @Input() messageNotFound: string = "No results found, please try with other search terms";

  @Output() onAction = new EventEmitter<TotsActionTable>();
  privateActions = new Subject<TotsActionTable>();

  isLoading = true;
  dataItems?: TotsListResponse<any>;
  displayColumns: Array<String> = [];
	@ViewChild("paginator") paginator! : MatPaginator;

  constructor(
    @Inject(TOTS_TABLE_DEFAULT_CONFIG) protected totsTableDefaultConfig:TotsTableDefaultConfig,
  ) {
    this.onPageChange
  }

  ngOnInit(): void {
    this.loadConfig();
    this.loadItems();
  }
  ngAfterViewInit(): void {
    this.loadIntl();
  }

  onClickOrder(column: TotsColumn) {
    if(!column.hasOrder){ return; }
    let orderColumn = column.order;
    this.config.columns.forEach(c => c.order = undefined);
    column.order = orderColumn == 'asc' ? 'desc' : 'asc';
    this.onAction.emit({ key: 'click-order', item: column });
  }

  onClickRow(item: any) {
    this.onAction.emit({ key: 'click-row', item: item });
  }

  onPageChange(event: PageEvent) {
    this.onAction.emit({ key: 'page-change', item: event });
    this.loadItems();
  }

  loadItems() {
    this.dataItems = undefined;
    this.isLoading = true;
    return this.config.obs?.pipe(
      tap(res => {
        this.dataItems = res;
        this.onAction.emit({ key: 'loaded-items', item: undefined })
        this.isLoading = false;
      })
    ).subscribe();
  }

  loadConfig() {
    this.loadColumns();
    this.privateActions.subscribe(action => {
      this.onAction.emit(action);
    });
  }
  private loadIntl() {
    let intl = this.config.paginatorIntl || this.totsTableDefaultConfig.paginatorIntl;
    if (intl) {
      this.paginator._intl.firstPageLabel = intl.firstPageLabel;
      this.paginator._intl.getRangeLabel = intl.getRangeLabel;
      this.paginator._intl.itemsPerPageLabel = intl.itemsPerPageLabel;
      this.paginator._intl.lastPageLabel = intl.lastPageLabel;
      this.paginator._intl.nextPageLabel = intl.nextPageLabel;
      this.paginator._intl.previousPageLabel = intl.previousPageLabel;
    }
  }

  loadColumns() {
    this.displayColumns = this.config.columns.filter(c => c.is_show || c.is_show == undefined).map(c => c.key);
  }

  getDataItems(): TotsListResponse<any> | undefined {
    return this.dataItems;
  }

  refreshDataItems(newData: TotsListResponse<any> | undefined) {
    this.dataItems = newData;
  }
}
