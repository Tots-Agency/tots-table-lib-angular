import { TotsColumn, TotsColumnOrder } from "@tots/table";
import { DateColumnComponent } from "../../public-api";

export class TotsDateColumn extends TotsColumn {
    // format_in y format_out opcionales porque deberían setearse por providers
	constructor(id:string, fieldKey:string, title?:string, inputFormat?:string, outputFormat?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, DateColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            format_in: inputFormat,
            format_out: outputFormat
        }
    }
}