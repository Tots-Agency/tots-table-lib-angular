import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/** Columns */
import { InputColumn } from './columns/input-column/input-column.component';

@NgModule({
  declarations: [

    /** Columns */
    InputColumn
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /** Angular Material */
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    /** Columns */
    InputColumn
  ]
})
export class TotsEditableColumnsModule { }
