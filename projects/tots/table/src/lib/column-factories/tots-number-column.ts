import { NumberColumnComponent } from "../columns/number-column/number-column.component";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsNumberColumn extends TotsColumn {
	constructor(id:string, fieldKey:string|string[], title?:string, hasOrder?:boolean, order?:TotsColumnOrder, prepend?:number|string, append?:number|string) {
        super(id, NumberColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            prepend: prepend,
            append: append
        }
    }
}