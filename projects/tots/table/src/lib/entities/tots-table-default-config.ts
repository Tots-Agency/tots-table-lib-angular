import { Injectable, InjectionToken } from "@angular/core";

export const TOTS_TABLE_DEFAULT_CONFIG = new InjectionToken<TotsTableDefaultConfig>('tots_table_default_config');

@Injectable({
  providedIn: "root"
})
export class TotsTableDefaultConfig {
  messageNotFound? : string =  "No results found, please try with other search terms";
  loadingComponent? : any;
}