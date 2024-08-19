import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TotsListResponse } from '@tots/core';
import { DateColumnComponent } from 'projects/tots/date-column/src/public-api';
import { InputColumn } from 'projects/tots/editable-columns/src/public-api';
import { BalanceCurrencyColumnComponent, BooleanColumnComponent, CheckboxColumnComponent, IconButtonColumnComponent, LinkColumnComponent, MoreMenuColumnComponent, NumberColumnComponent, OptionColumnComponent, StatusColumnComponent, StringColumnComponent, TotsActionTable, TotsColumn, TotsTableComponent, TotsTableConfig, TotsTableLocalComponent, TotsTableLocalConfig, TwoStringColumnComponent, UserColumnComponent } from 'projects/tots/table/src/public-api';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('tableComp') tableComp!: TotsTableComponent;

  config = new TotsTableConfig();

  items = [
    { title: 'Item 1, pedro', active: 1, subtitle: 'AB232', date: '2021-01-01', amount: 10500, debit: 1000, credit: 500, website: "https://www.youtube.com/watch?v=5kMsykEAcjg" },
    { title: 'Item 2', active: 1, subtitle: 'AB232', date: '2021-01-01', amount: 10500, debit: 500, credit: 1000, edit_field: 'Pedro' },
    { title: 'Item 3', active: 0, subtitle: 'AB232', date: '2021-01-01', amount: 10500, website: "https://www.youtube.com/watch?v=5kMsykEAcjg" },
    { title: 'Item 4', active: 0, subtitle: 'AB232', date: '2021-01-01', amount: 10500, classCustom: 'tots-cell-item-green' },
    { title: 'Item 5', active: 1, subtitle: 'AB232', date: '2021-01-01', amount: 10500, website: "https://www.youtube.com/watch?v=5kMsykEAcjg" },
    { title: 'Item 6', active: 1, subtitle: 'AB232', date: '2021-01-01', amount: 1020 },
    { title: 'Item 7', active: 0, subtitle: 'AB232', date: '2021-01-01', amount: 2662100, website: "https://www.youtube.com/watch?v=5kMsykEAcjg" },
    { title: 'Item 8', active: 1, subtitle: 'AB232', date: '2021-01-01', amount: 15080 },
    { title: 'Item 9', active: 0, subtitle: 'AB232', date: '2021-01-01', amount: 12400, website: "https://www.youtube.com/watch?v=5kMsykEAcjg" },
    { title: 'Item 10', active: 1, subtitle: 'AB232', date: '2021-01-01', amount: 608700 },
  ];

  formGroup = new FormGroup({});

  @ViewChild('tableCompLocal') tableCompLocal!: TotsTableLocalComponent;
  configLocal = new TotsTableLocalConfig();

  ngOnInit(): void {
    //this.loadMiniConfig();
    this.loadConfig();
    this.loadConfigLocal();
  }

  onOrder(column: TotsColumn) {
    let response = new TotsListResponse();

    if(column.order == 'asc'){
      response.data = this.items.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    } else {
      response.data = this.items.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
    }

    this.config.obs = of(response);
    this.tableComp.loadItems();
  }

  onTableAction(action: TotsActionTable) {
    console.log(action);
    if (action.key == 'click-order') {
      this.onOrder(action.item);
    } else if (action.key == 'select-item') {
      action.item.isSelected = true;
    } else if (action.key == 'unselect-item') {
      action.item.isSelected = false;
    } else if (action.key == "page-change") {
      this.changePage(action.item);
    }
  }

  loadConfig() {
    this.config.id = 'table-example';
    this.config.columns = [
      { key: 'check', component: CheckboxColumnComponent, title: '', },
      { key: 'title', component: StringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: true, extra: { cutSeparator: ',', prepend: "Prepend" } },
      { key: 'user-full', component: UserColumnComponent, title: 'User', field_key: 'title', hasOrder: true, extra: { field_firstname_key: 'title', field_lastname_key: 'subtitle', field_photo_key: ['user', 'photo'], is_clickable: true, click_event: 'click-user' } },
      { key: 'subtitle', component: TwoStringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: false, extra: { field_subtitle_key: 'subtitle' } },
      { key: 'include', component: BooleanColumnComponent, title: 'Activo', field_key: 'active', hasOrder: false },
      { key: 'home', component: IconButtonColumnComponent, title: 'asd', field_key: 'active', hasOrder: false, extra: { icon: 'home', action: 'click-home' } },
      { key: 'balance', component: BalanceCurrencyColumnComponent, title: 'Balance', hasOrder: false, extra: { field_key_debit: 'debit', field_key_credit: 'credit' } },
      { key: 'active', component: OptionColumnComponent, title: 'Activo', field_key: 'active', hasOrder: false, extra: {
        field_rel_key: 'id',
        field_print_key: 'name',
        options: [
          { id: 1, name: 'Activo A' },
          { id: 0, name: 'Inactivo B' },
        ]
      } },
      { key: 'active2', component: StatusColumnComponent, title: 'Activo2', field_key: 'active', hasOrder: false, extra: {
        field_rel_key: 'id',
        field_print_key: 'name',
        options: [
          { id: 1, name: 'Activo A' },
          { id: 0, name: 'Inactivo B', background_color: 'rgba(128, 188, 0, 1)', font_color: 'white' },
        ]
      } },
      { key: 'date', component: DateColumnComponent, title: 'Date', field_key: 'date', hasOrder: false, extra: { format_in: 'YYYY-MM-DD', format_out: 'MM/DD/YYYY' } },
      { key: 'edit_field', component: InputColumn, title: 'Edit', field_key: 'edit_field', extra: { validators: [Validators.required] } },
      { key: 'website', component: LinkColumnComponent, title: 'Página Web', field_key: 'website', extra: { target: "_self", caption: "Ver" } },
      { key: 'more', component: MoreMenuColumnComponent, title: '', extra: { stickyEnd: true, width: '60px', actions: [
        { icon: 'add', title: 'Editar', key: 'edit' },
        { icon: 'add', title: 'Eliminar', key: 'remove' },
      ]} },
    ];

    let data = new TotsListResponse();
    data.data = this.items;
    //data.data = [];

    this.config.obs = of(data).pipe(delay(1000));
  }


  loadMiniConfig() {
    this.config.id = 'table-example';
    this.config.columns = [
      {
        key: 'amount',
        component: NumberColumnComponent,
        title: 'Number',
        field_key: 'amount',
        extra: {
          prepend: "p",
          append: "a"
        }
      },
    ];

    let data = new TotsListResponse();
    data.data = this.items;

    this.config.obs = of(data).pipe(delay(1000));
  }

  loadConfigLocal() {
    this.configLocal.id = 'table-local-example';
    this.configLocal.searchKeys = ['title', 'subtitle'];
    this.configLocal.columns = [
      { key: 'check', component: CheckboxColumnComponent, title: '', },
      { key: 'title', component: StringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: true, extra: { cutSeparator: ',', prepend: "Prepend" } },
      { key: 'subtitle', component: TwoStringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: false, extra: { field_subtitle_key: 'subtitle' } },
      { key: 'include', component: BooleanColumnComponent, title: 'Activo', field_key: 'active', hasOrder: false },
      { key: 'home', component: IconButtonColumnComponent, title: 'asd', field_key: 'active', hasOrder: false, extra: { icon: 'home', action: 'click-home' } },
      { key: 'amount', component: StringColumnComponent, title: 'Amount', field_key: 'amount', hasOrder: true },
    ];

    let data = new TotsListResponse();
    data.data = this.items;

    this.configLocal.obs = of(data).pipe(delay(1000));
  }

  clickTestLocalSearch() {
    this.tableCompLocal.onSearch('Item 12');
  }

  private changePage(pageEvent:PageEvent) {
    console.log(pageEvent);
    let data = new TotsListResponse();
    data.data = [...this.items];
    data.total = 50;

    this.config.obs = of(data).pipe(delay(2000));
    this.tableComp.loadItems();
	}
}
