import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './pages/table/table.component';
import { TotsTableModule } from 'projects/tots/table/src/public-api';
import { TotsDateColumnModule } from 'projects/tots/date-column/src/public-api';
import { config } from './classes/tots-table-default-config';
import { TOTS_TABLE_DEFAULT_CONFIG } from 'projects/tots/table/src/lib/entities/tots-table-default-config';

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
    TotsDateColumnModule
  ],
  providers: [
    {
      provide: TOTS_TABLE_DEFAULT_CONFIG,
      useValue: config
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
