import { CheckboxColumnComponent } from "../columns/checkbox-column/checkbox-column.component";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsCheckboxColumn extends TotsColumn {
	constructor(id:string, fieldKey?:string|string[], title?:string, color?:string, cssClass?:string, hasOrder?:boolean, order?:TotsColumnOrder, stickyEnd?:true) {
        super(id, CheckboxColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            stickyEnd: stickyEnd,
            color: color,
            class: cssClass
        }
    }
}