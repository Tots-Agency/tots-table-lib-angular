import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Angular Material */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

/** Components */
import { TotsTableComponent } from './components/tots-table/tots-table.component';
import { TotsTableApiComponent } from './components/tots-table-api/tots-table-api.component';

/** Columns */
import { BasePrintColumnComponent } from './columns/base-print-column/base-print-column.component';
import { StringColumnComponent } from './columns/string-column/string-column.component';
import { MoreMenuColumnComponent } from './columns/more-menu-column/more-menu-column.component';



@NgModule({
  declarations: [
    TotsTableComponent,
    BasePrintColumnComponent,
    StringColumnComponent,
    TotsTableApiComponent,
    MoreMenuColumnComponent
  ],
  imports: [
    CommonModule,
    // Angular Material
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    TotsTableComponent,
    TotsTableApiComponent
  ]
})
export class TotsTableModule { }
