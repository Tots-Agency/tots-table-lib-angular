import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TotsListResponse } from '@tots/core';
import { DateColumnComponent } from 'projects/tots/date-column/src/public-api';
import { InputColumn } from 'projects/tots/editable-columns/src/public-api';
import { TotsBalanceCurrencyColumn } from 'projects/tots/table/src/lib/column-component-constructors/balance-currency-column';
import { TotsBooleanColumn } from 'projects/tots/table/src/lib/column-component-constructors/boolean-column';
import { TotsCheckboxColumn } from 'projects/tots/table/src/lib/column-component-constructors/checkbox-column';
import { TotsDateColumn } from 'projects/tots/table/src/lib/column-component-constructors/date-column';
import { TotsIconButtonColumn } from 'projects/tots/table/src/lib/column-component-constructors/icon-button-column';
import { TotsColumnOption, TotsOptionColumn } from 'projects/tots/table/src/lib/column-component-constructors/option-column';
import { TotsStatusColumn, TotsStatusColumnOption } from 'projects/tots/table/src/lib/column-component-constructors/status-column';
import { TotsStringColumn } from 'projects/tots/table/src/lib/column-component-constructors/string-column';
import { TotsTwoStringColumn } from 'projects/tots/table/src/lib/column-component-constructors/two-string-column';
import { BalanceCurrencyColumnComponent, BooleanColumnComponent, CheckboxColumnComponent, IconButtonColumnComponent, MoreMenuColumnComponent, OptionColumnComponent, StatusColumnComponent, StringColumnComponent, TotsActionTable, TotsColumn, TotsTableComponent, TotsTableConfig, TwoStringColumnComponent } from 'projects/tots/table/src/public-api';
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
    { title: 'Item 1, pedro', active: 1, subtitle: 'AB232', date: '2021-01-01', debit: 1000, credit: 500 },
    { title: 'Item 2', active: 1, subtitle: 'AB232', date: '2021-01-01', debit: 500, credit: 1000, edit_field: 'Pedro' },
    { title: 'Item 3', active: 0, subtitle: 'AB232', date: '2021-01-01' },
    { title: 'Item 4', active: 0, subtitle: 'AB232', date: '2021-01-01', classCustom: 'tots-cell-item-green' },
    { title: 'Item 5', active: 1, subtitle: 'AB232', date: '2021-01-01' },
  ];

  formGroup = new FormGroup({});

  ngOnInit(): void {
    this.loadConfig();
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
    if(action.key == 'click-order'){
      this.onOrder(action.item);
    }else if (action.key == 'select-item') {
      action.item.isSelected = true;
    }else if (action.key == 'unselect-item') {
      action.item.isSelected = false;
    }
  }

  loadConfig() {
    this.config.id = 'table-example';
	/*
    this.config.columns = [
      { key: 'check', component: CheckboxColumnComponent, title: '', },
      { key: 'title', component: StringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: true, extra: { cutSeparator: ',' } },
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
      { key: 'more', component: MoreMenuColumnComponent, title: '', extra: { stickyEnd: true, width: '60px', actions: [
        { icon: 'add', title: 'Editar', key: 'edit' },
        { icon: 'add', title: 'Eliminar', key: 'remove' },
      ]} },
    ];
	*/

	this.config.columns = [
		new TotsCheckboxColumn("check"),
		new TotsStringColumn("title", "title", "Título", true),
		new TotsTwoStringColumn("subtitle", "title", "subtitle", "Título / Subtítulo"),
		new TotsBooleanColumn("include", "active", "Activo"),
		new TotsIconButtonColumn("home", "home", "primary", "click-home", "a_css_class"),
		new TotsBalanceCurrencyColumn("active", "credit", "debit", "Balance"),
		new TotsOptionColumn("active", "active", [
			new TotsColumnOption(1, "Activo A"),
			new TotsColumnOption(0, "Inactivo B")
		], "Activo"),
		new TotsStatusColumn("active2", "active", [
			new TotsStatusColumnOption(1, "Activo A", "green", "white"),
			new TotsStatusColumnOption(0, "Inactivo B", "red", "white"),
		], "Activo2"),
		new TotsDateColumn("date", "date", "YYYY-MM-DD", 'MM/DD/YYYY'),
		// new TotsInputColumn(...)
		// new TotsMoreColumn(...)
	]

    let data = new TotsListResponse();
    data.data = this.items;

    this.config.obs = of(data).pipe(delay(1000));
  }
}