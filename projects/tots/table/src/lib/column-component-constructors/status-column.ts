import { StatusColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";
import { TotsColumnOption, TotsOptionColumn } from "./option-column";

export class TotsStatusColumn extends TotsColumn {
    // value y caption. Nada de field_rel_key y field_print_key
    // los 4 campos del option obligatorios
	constructor(key:string, field_key:string, options:TotsStatusColumnOption[], title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, StatusColumnComponent, field_key, title, hasOrder, order);
        this.extra = {
            options: options,
            field_rel_key: "value",
            field_print_key: "caption"
        }
    }
}

export class TotsStatusColumnOption extends TotsColumnOption {
    background_color: string;
    font_color: string;

    constructor(value:number|string, caption:string, background_color:string, font_color:string) {
        super(value, caption);
        this.background_color = background_color;
        this.font_color = font_color;
    }
}