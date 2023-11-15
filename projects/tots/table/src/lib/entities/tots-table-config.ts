import { TotsListResponse, TotsQuery } from "@tots/core";
import { Observable } from "rxjs";
import { TotsColumn } from "./tots-column";
import { MatPaginatorIntl } from "@angular/material/paginator";

export class TotsTableConfig {
    id?: string = '';
    columns: Array<TotsColumn> = [];
    obs?: Observable<TotsListResponse<any>>;
    classes?: string = '';
    intl?: MatPaginatorIntl;
}