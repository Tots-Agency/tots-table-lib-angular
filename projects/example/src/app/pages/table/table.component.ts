import { Component, OnInit, ViewChild } from '@angular/core';
import { TotsListResponse } from '@tots/core';
import { DateColumnComponent } from 'projects/tots/date-column/src/public-api';
import { BooleanColumnComponent, CheckboxColumnComponent, IconButtonColumnComponent, MoreMenuColumnComponent, StringColumnComponent, TotsActionTable, TotsColumn, TotsTableComponent, TotsTableConfig, TwoStringColumnComponent } from 'projects/tots/table/src/public-api';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('tableComp') tableComp!: TotsTableComponent;

  config = new TotsTableConfig();

  ngOnInit(): void {
    this.loadConfig();
  }

  onOrder(column: TotsColumn) {
    let response = new TotsListResponse();
    let data = [
      { title: 'Item 1', active: 1, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 2', active: 1, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 3', active: 0, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 4', active: 1, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 5', active: 1, subtitle: 'AB232', date: '2021-01-01' },
    ];

    if(column.order == 'asc'){
      response.data = data.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    } else {
      response.data = data.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
    }

    this.config.obs = of(response);
    this.tableComp.loadItems();
  }

  onTableAction(action: TotsActionTable) {
    console.log(action);
    if(action.key == 'click-order'){
      this.onOrder(action.item);
    }
  }

  loadConfig() {
    this.config.id = 'table-example';
    this.config.columns = [
      { key: 'check', component: CheckboxColumnComponent, title: '', },
      { key: 'title', component: StringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: true },
      { key: 'subtitle', component: TwoStringColumnComponent, title: 'Titulo', field_key: 'title', hasOrder: false, extra: { field_subtitle_key: 'subtitle' } },
      { key: 'include', component: BooleanColumnComponent, title: 'Activo', field_key: 'active', hasOrder: false },
      { key: 'home', component: IconButtonColumnComponent, title: 'asd', field_key: 'active', hasOrder: false, extra: { icon: 'home', action: 'click-home' } },
      { key: 'date', component: DateColumnComponent, title: 'Date', field_key: 'date', hasOrder: false, extra: { format_in: 'YYYY-MM-DD', format_out: 'MM/DD/YYYY' } },
      { key: 'more', component: MoreMenuColumnComponent, title: '', extra: { width: '60px', actions: [
        { icon: 'add', title: 'Editar', key: 'edit' },
        { icon: 'add', title: 'Eliminar', key: 'remove' },
      ]} },
    ];

    let data = new TotsListResponse();
    data.data = [
      { title: 'Item 1', active: 1, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 2', active: 1, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 3', active: 0, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 4', active: 0, subtitle: 'AB232', date: '2021-01-01' },
      { title: 'Item 5', active: 1, subtitle: 'AB232', date: '2021-01-01' },
    ]

    this.config.obs = of(data);
  }
}
