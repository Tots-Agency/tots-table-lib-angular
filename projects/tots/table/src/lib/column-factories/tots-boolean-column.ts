import { BooleanColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsBooleanColumn extends TotsColumn {
	constructor(id:string, fieldKey:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, BooleanColumnComponent, fieldKey, title, hasOrder, order);
    }
}