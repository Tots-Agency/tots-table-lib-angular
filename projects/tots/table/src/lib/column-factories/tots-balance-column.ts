import { BalanceCurrencyColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsBalanceColumn extends TotsColumn {
	constructor(id:string, activeAssetFieldKey:string, passiveAssetFieldKey:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, BalanceCurrencyColumnComponent, undefined, title, hasOrder, order);
        this.extra = {
            field_key_credit: activeAssetFieldKey,
            field_key_debit: passiveAssetFieldKey
        }
    }
}