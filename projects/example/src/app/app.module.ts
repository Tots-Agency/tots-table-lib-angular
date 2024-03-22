import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './pages/table/table.component';
import { TOTS_TABLE_DEFAULT_CONFIG, TotsTableModule } from 'projects/tots/table/src/public-api';
import { TotsDateColumnModule } from 'projects/tots/date-column/src/public-api';
import { TotsEditableColumnsModule } from 'projects/tots/editable-columns/src/public-api';
import { totsTableDefaultConfig } from './entities/tots-table-default-config';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TotsTableModule,
    TotsDateColumnModule,
    TotsEditableColumnsModule
  ],
  providers: [
    {
      provide: TOTS_TABLE_DEFAULT_CONFIG,
      useValue: totsTableDefaultConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
