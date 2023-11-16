import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export class ProviderPaginatorIntl implements MatPaginatorIntl {
	changes = new Subject<void>();
	firstPageLabel = "Primera página";
	lastPageLabel = "Última página";
	itemsPerPageLabel = "(Por provider) Items por página";
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

export class CustomPaginatorIntl implements MatPaginatorIntl {
	changes = new Subject<void>();
	firstPageLabel = "Primera página";
	lastPageLabel = "Última página";
	itemsPerPageLabel = "(Por config) Items por página";
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