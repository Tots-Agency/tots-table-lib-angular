import { TotsColumn, TotsColumnOption } from "@tots/table";
import { SelectColumnComponent } from "../columns/select-column/select-column.component";
import { FormGroup } from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsValidator } from "../entities/tots-validator";

export class TotsSelectColumn extends TotsColumn {
	constructor(id:string, fieldKey:string|string[], options:TotsColumnOption[], validators?:TotsValidator[], title?:string, formGroup?:FormGroup, label?:string, placeholder?:string, hint?:string, cssClass?:string, appearance?:MatFormFieldAppearance) {
        super(id, SelectColumnComponent, fieldKey, title);
        this.extra = {
            group: formGroup,
            options: options,
            field_select_key: "value",
            field_print_key: "caption",
            validators: validators?.map(v=> v.validator),
            errors: validators?.map(v=> {return {name:v.name, message:v.message}}),
            label: label,
            class: cssClass,
            placeholder: placeholder,
            caption: hint,
            appearance: appearance
        }
    }
}