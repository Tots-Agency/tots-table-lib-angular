import { Component } from '@angular/core';
import { TotsTableHelper } from '../../helpers/tots-table-helper';
import { TotsBaseColumnComponent } from '../tots-base-column.component';

@Component({
  selector: 'tots-user-column',
  templateUrl: './user-column.component.html',
  styleUrls: ['./user-column.component.scss']
})
export class UserColumnComponent extends TotsBaseColumnComponent {

  onClick(event: any) {
    if(!this.isClickable()){
      return;
    }

    this.onAction.next({ key: this.getClickEvent(), item: this.item });
    event.stopPropagation();
  }

  getFirstname() {
    if(this.column.extra?.field_firstname_key){
      return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.field_firstname_key);
    }

    return '';
  }

  getLastname() {
    if(this.column.extra?.field_lastname_key){
      return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.field_lastname_key);
    }

    return '';
  }

  getFullname() {
    return this.getFirstname() + ' ' + this.getLastname();
  }

  getPhoto() {
    if(this.column.extra?.field_photo_key){
      return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.field_photo_key);
    }

    return '';
  }

  getSubtitle() {
    if(this.column.extra?.field_subtitle_key){
      return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.field_subtitle_key);
    }

    return '';
  }

  isOnline() {
    if(this.column.extra?.field_online_key){
      return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.field_online_key);
    }

    return false;
  }

  isClickable() {
    if(this.column.extra?.is_clickable){
      return true;
    }

    return false;
  }

  getClickEvent() {
    if(this.column.extra?.click_event){
      return this.column.extra.click_event;
    }

    return 'click-column';
  }
}
