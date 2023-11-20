import { BooleanColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsBooleanColumn extends TotsColumn {
	constructor(key:string, field_key:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, BooleanColumnComponent, field_key, title, hasOrder, order);
    }
}