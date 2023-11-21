import { CurrencyColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsCurrencyColumn extends TotsColumn {
	constructor(id:string, fieldKey:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, CurrencyColumnComponent, fieldKey, title, hasOrder, order);
    }
}