import { TotsTableDefaultConfig } from "dist/tots/table/lib/entities/tots-table-default-config";
import { ProviderPaginatorIntl } from "./custom-paginator-intl";

export const config : TotsTableDefaultConfig = {
	paginatorIntl: new ProviderPaginatorIntl()
}