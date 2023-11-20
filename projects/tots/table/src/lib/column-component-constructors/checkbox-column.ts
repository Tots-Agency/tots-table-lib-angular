import { CheckboxColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsCheckboxColumn extends TotsColumn {
	constructor(key:string, field_key?:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, CheckboxColumnComponent, field_key, title, hasOrder, order);
    }
}