import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './pages/table/table.component';
import { TotsTableModule } from 'projects/tots/table/src/public-api';
import { TotsDateColumnModule } from 'projects/tots/date-column/src/public-api';
import { TotsEditableColumnsModule } from 'projects/tots/editable-columns/src/public-api';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
