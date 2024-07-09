import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

/** Tots Libraries */
import { TotsTableModule } from '@tots/table';

/** Columns */
import { InputColumnComponent } from './columns/input-column/input-column.component';
import { SelectColumnComponent } from './columns/select-column/select-column.component';

/** Components */
import { TotsTableFullGroupComponent } from './components/tots-table-full-group/tots-table-full-group.component';





@NgModule({
  declarations: [
    /** Columns */
    InputColumnComponent,
    SelectColumnComponent,

    /** Components */
    TotsTableFullGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /** Angular Material */
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    /** Tots Libraries */
    TotsTableModule
  ],
  exports: [
    /** Columns */
    InputColumnComponent,

    /** Components */
    TotsTableFullGroupComponent
  ]
})
export class TotsEditableColumnsModule { }
