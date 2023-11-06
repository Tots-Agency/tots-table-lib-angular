import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  exports: [
    /** Columns */
    InputColumn
  ]
})
export class TotsEditableColumnsModule { }
