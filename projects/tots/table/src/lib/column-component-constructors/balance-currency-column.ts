import { BalanceCurrencyColumnComponent, StringColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsBalanceCurrencyColumn extends TotsColumn {
    // credit y debit están mal utilizados. mejor usar activo y pasivo. el debe no es deberle algo a alguien en contabilidad
    // o no sé cuál es cuál en esa librería, pero justamente por eso es mejor activo y pasivo
    // ambos obligatorios
	constructor(key:string, active_asset_field_key:string, passive_asset_field_key:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, BalanceCurrencyColumnComponent, undefined, title, hasOrder, order);
        this.extra = {
            field_key_credit: active_asset_field_key,
            field_key_debit: passive_asset_field_key
        }
    }
}