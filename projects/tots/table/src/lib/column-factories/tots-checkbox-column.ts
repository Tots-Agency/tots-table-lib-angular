import { ThemePalette } from "@angular/material/core";
import { CheckboxColumnComponent } from "../../public-api";
import { TotsColumn, TotsColumnOrder } from "../entities/tots-column";

export class TotsCheckboxColumn extends TotsColumn {
	constructor(id:string, fieldKey?:string, title?:string, color?:ThemePalette, cssClass?:string, hasOrder?:boolean, order?:TotsColumnOrder, stickyEnd?:true) {
        super(id, CheckboxColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            stickyEnd: stickyEnd,
            color: color,
            class: cssClass
        }
    }
}