import { OptionColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsOptionColumn extends TotsColumn {
    // value y caption. Nada de field_rel_key y field_print_key
	constructor(key:string, field_key:string, options:TotsColumnOption[], title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, OptionColumnComponent, field_key, title, hasOrder, order);
        this.extra = {
            options: options,
            field_rel_key: "value",
            field_print_key: "caption"
        }
    }
}

export class TotsColumnOption {
    value: number|string;
    caption: string;

    constructor(value:number|string, caption:string) {
        this.value = value;
        this.caption = caption;
    }
}