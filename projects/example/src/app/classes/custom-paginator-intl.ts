import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export class CustomPaginatorIntl implements MatPaginatorIntl {
	changes = new Subject<void>();
	firstPageLabel = "Primera página";
	lastPageLabel = "Última página";
	itemsPerPageLabel = "Items por página";
	nextPageLabel = "Siguiente";
	previousPageLabel = "Anterior";
	getRangeLabel(page: number, pageSize: number, length: number): string {
		if (length === 0) {
			return "";
		}
		const amountPages = Math.ceil(length / pageSize);
		return "Página "+ (page + 1) +" de "+ amountPages;
	}
}