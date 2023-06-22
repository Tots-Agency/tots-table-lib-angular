import { Component } from '@angular/core';
import { BalanceCurrencyColumnComponent } from '../balance-currency-column/balance-currency-column.component';
import { TotsTableHelper } from '../../helpers/tots-table-helper';

@Component({
  selector: 'tots-balance-currency-icon-column',
  templateUrl: './balance-currency-icon-column.component.html',
  styleUrls: ['./balance-currency-icon-column.component.css']
})
export class BalanceCurrencyIconColumnComponent extends BalanceCurrencyColumnComponent {

  getIconPositive(): any {
    return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.icon_positive);
  }

  getIconNegative(): any {
    return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.icon_negative);
  }

  getIconNeutral(): any {
    return TotsTableHelper.getItemValueByKey(this.item, this.column.extra.icon_neutral);
  }
}
