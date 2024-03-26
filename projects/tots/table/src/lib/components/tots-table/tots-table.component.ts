import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TotsListResponse } from '@tots/core';
import { Subject, tap } from 'rxjs';
import { TotsActionTable } from '../../entities/tots-action-table';
import { TotsColumn } from '../../entities/tots-column';
import { TotsTableConfig } from '../../entities/tots-table-config';
import { TOTS_TABLE_DEFAULT_CONFIG, TotsTableDefaultConfig } from '../../entities/tots-table-default-config';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'tots-table',
  templateUrl: './tots-table.component.html',
  styleUrls: ['./tots-table.component.scss']
})
export class TotsTableComponent implements OnInit, AfterViewInit {

  @Input() config = new TotsTableConfig();
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 50;
  @Input() hasPagination: boolean = true;
  @Input() messageNotFound! : string;

  @Output() onAction = new EventEmitter<TotsActionTable>();
  privateActions = new Subject<TotsActionTable>();

  isLoading = true;
  dataItems?: TotsListResponse<any>;
  displayColumns: Array<String> = [];

	@ViewChild('loadingComponentContainer', { read: ViewContainerRef }) loadingComponentContainer! : ViewContainerRef;
  loadingComponent! : ComponentRef<any>;

  //#region Setup
  constructor(
    protected changeDectetor: ChangeDetectorRef,
    @Inject(TOTS_TABLE_DEFAULT_CONFIG) private totsTableDefaultConfig : TotsTableDefaultConfig,
		private viewContainerRef: ViewContainerRef
  ) {
    this.messageNotFound = this.totsTableDefaultConfig.messageNotFound!;
  }

  //#region Lifetime cycles
  ngOnInit(): void {
    this.setLoader();
    this.loadConfig();
    this.loadItems();      
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isLoading)
        this.renderLoading();
    });
  }
  ngOnDestroy() {
    this.loadingComponentContainer?.clear();
  }
  //#endregion

  private setLoader() {
    if (this.totsTableDefaultConfig.loadingComponent) {
      this.loadingComponent = this.viewContainerRef.createComponent(this.totsTableDefaultConfig.loadingComponent);
    } else {
      this.loadingComponent = this.viewContainerRef.createComponent(MatProgressSpinner);
      this.loadingComponent.instance.diameter = 50;
      this.loadingComponent.instance.mode = "indeterminate";
    }
  }

  loadConfig() {
    this.loadColumns();
    this.privateActions.subscribe(action => {
      this.onAction.emit(action);
    });
  }
  loadItems() {
    this.dataItems = undefined;
    this.isLoading = true;
    this.renderLoading();
    return this.config.obs?.pipe(
      tap(res => {
        this.dataItems = res;
        this.onAction.emit({ key: 'loaded-items', item: res })
      })
    ).subscribe(()=> this.stopLoading());
  }
  private renderLoading() {
      this.loadingComponentContainer?.insert(this.loadingComponent.hostView);
  }
  private stopLoading() {
    this.isLoading = false;
    this.loadingComponentContainer?.clear();
  }
  //#endregion

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

  detectChanges() {
    this.changeDectetor.detectChanges();
  }
}
