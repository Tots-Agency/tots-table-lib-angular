import { DateColumnComponent } from "projects/tots/date-column/src/public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsDateColumn extends TotsColumn {
    // format_in y format_out opcionales porque deberían setearse por providers
	constructor(key:string, field_key:string, input_format?:string, output_format?:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, DateColumnComponent, field_key, title, hasOrder, order);
        this.extra = {
            format_in: input_format,
            format_out: output_format
        }
    }
}