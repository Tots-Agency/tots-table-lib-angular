import { TotsBaseColumnComponent } from "../columns/tots-base-column.component";

export class TotsColumn {
    key : string;
    component: any;
    
    field_key?: string|Array<string>;
    title? : string;

    extra?: any;
    is_show? : boolean = true;
    hasOrder? : boolean;
    order?: 'asc'|'desc';

    constructor(key:string, component:any, field_key?:string, title?:string, hasOrder=false, order?:TotsColumnOrder) {
        this.key = key;
        this.field_key = field_key;
        this.title = title;
        this.component = component;
    }
}

export type TotsColumnOrder = "asc"|"desc";