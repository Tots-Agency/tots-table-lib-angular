import { TwoStringColumnComponent } from "../columns/two-string-column/two-string-column.component";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsTwoStringColumn extends TotsColumn {
	constructor(id:string, fieldKey:string, secondFieldKey:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, TwoStringColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            field_subtitle_key: secondFieldKey
        }
    }
}