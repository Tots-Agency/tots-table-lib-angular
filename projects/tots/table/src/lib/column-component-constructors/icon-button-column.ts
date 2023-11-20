import { ThemePalette } from "@angular/material/core";
import { IconButtonColumnComponent } from "../../public-api";
import { TotsColumn } from "../entities/tots-column";

export class TotsIconButtonColumn extends TotsColumn {
	constructor(key:string, icon:string, color:ThemePalette, action:string, classes?:string, title?:string) {
        super(key, IconButtonColumnComponent, undefined, title);
        this.extra = {
            icon: icon,
            matColor: color,
            action: action,
            classes: classes
        }
    }
}