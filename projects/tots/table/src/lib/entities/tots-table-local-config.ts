import { TotsBaseHttpService, TotsListResponse, TotsQuery } from "@tots/core";
import { TotsColumn } from "./tots-column";
import { Observable } from "rxjs";
import { TotsTableConfig } from "./tots-table-config";

export class TotsTableLocalConfig extends TotsTableConfig {
  searchKeys: Array<string> = [];
}
