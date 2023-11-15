import { Injectable, InjectionToken } from "@angular/core";
import { MatPaginatorIntl } from '@angular/material/paginator';

export const TOTS_TABLE_DEFAULT_CONFIG = new InjectionToken<TotsTableDefaultConfig>('table_default_config');

@Injectable()
export class TotsTableDefaultConfig {
  paginatorIntl? : MatPaginatorIntl;
}