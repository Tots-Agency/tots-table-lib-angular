import { StringColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsStringColumn extends TotsColumn {
	constructor(id:string, fieldKey:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, StringColumnComponent, fieldKey, title, hasOrder, order);
    }
}