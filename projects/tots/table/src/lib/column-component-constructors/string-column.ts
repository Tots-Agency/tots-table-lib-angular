import { StringColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsStringColumn extends TotsColumn {
    // Sin cutSeparator. Que vengan bien los datos en vez de corregir las cosas desde el front
    // field_key "obligatorio"
	constructor(key:string, field_key:string, title?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(key, StringColumnComponent, field_key, title, hasOrder, order);
    }
}