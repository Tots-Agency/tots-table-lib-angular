import { LinkColumnComponent } from "../columns/link-column/link-column.component";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsLinkColumn extends TotsColumn {
	constructor(id:string, fieldKey:string|string[], title?:string, hasOrder?:boolean, order?:TotsColumnOrder, caption?:string, target?:"_blank"|"_self") {
        super(id, LinkColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            caption: caption,
            target: target
        }
    }
}
