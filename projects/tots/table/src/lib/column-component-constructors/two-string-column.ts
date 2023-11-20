import { TwoStringColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsTwoStringColumn extends TotsColumn {
    // field_key y second_field_key "obligatorios"
	constructor(key:string, field_key:string, second_field_key:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, TwoStringColumnComponent, field_key, title, hasOrder, order);
        this.extra = {
            field_subtitle_key: second_field_key
        }
    }
}