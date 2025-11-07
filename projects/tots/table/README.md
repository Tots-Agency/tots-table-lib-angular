<div align="center">
  <img src="https://avatars.githubusercontent.com/u/117909365" alt="Tots Logo" width="150">
  
  <h1>
    @tots/table
  </h1>

</div>

<br><br>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

`@tots/table` is a library for creating tables through column definitions with a predefined logic and look. It includes

- Three table components
	- Basic table
	- Table with built in HTTP functionality
	- Table with form logic
- A set of interchangeable columns
- Configuration through dependency injection
- The posibility of creating custom columns

<br>
<hr>
<br>

## Installation

```bash
npm install @tots/table
```

Ensure your project uses Angular 20+ and compatible versions of TypeScript, and rxjs.

<br>
<hr>
<br>

## Importing the module

```typescript
import { NgModule } from '@angular/core';
import { TotsTableModule } from '@tots/table';

@NgModule({
	imports: [TotsTableModule]
})
export class AppModule { }
```

<br>

## Configuration through providers

```typescript
import { NgModule } from '@angular/core';
import { TotsTableModule, TOTS_TABLE_DEFAULT_CONFIG } from '@tots/table';
import { CustomLoadingComponent } from "./components/custom-loading/custom-loading.component";

export const totsTableDefaultConfig : TotsTableDefaultConfig = {
	loadingComponent: CustomLoadingComponent,
	upperPaginator: true,
	upperProgressBar: true
}

@NgModule({
	imports: [TotsTableModule],
	providers: [
		{
			provide: TOTS_TABLE_DEFAULT_CONFIG,
			useValue: totsTableDefaultConfig
		}
	]
})
```

<br>

## Usage of Tots Table

```html
<tots-table
	[config]="config"
	(onAction)="onTableAction($event)"
	[pageIndex]="1"
	[pageSize]="5"
></tots-table>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';
import { TotsTableConfig, TotsStringColumn, TotsOptionColumn, TotsColumnOption, TotsNumberColumn, TotsDateColumn, TotsMoreMenuColumn, TotsMoreMenuItem, TotsActionTable } from 'tots/table';
import { TotsListResponse } from '@tots/core';

@Component({
	//...
})
export class AppComponent implements OnInit {
	
	protected config! : TotsTableConfig;

	// Can contain data for starting values or be empty
	protected item = {
		name: "Name",
    		type: 2
	};
	protected items = [
		{ id: 1, title: 'Item 1', active: 1, amount: 10500, date: '2025-01-01' },
		{ id: 2, title: 'Item 2', active: 1, amount: 9200, date: '2025-02-02' },
		{ id: 3, title: 'Item 3', active: 0, amount: 18900, date: '2025-03-03' },
		{ id: 4, title: 'Item 4', active: 0, amount: 14500, date: '2025-04-04' },
		{ id: 5, title: 'Item 5', active: 1, amount: 1200, date: '2025-05-05' },
	];

	ngOnInit() {
		this.config = new TotsTableConfig();
		this.config.id = 'table-example';

		this.config.columns = [
			new TotsStringColumn("id", "id", "#", true),
			new TotsStringColumn("title", "title", "Título", true),
			new TotsOptionColumn("active", "active", [
				new TotsColumnOption(1, "Active"),
				new TotsColumnOption(0, "Inactive")
			], "Active"),
			new TotsNumberColumn("amount", "amount", "Amount", true)
			new TotsDateColumn("date", "date", "Fecha", "YYYY-MM-DD", 'MM/DD/YYYY'),
			new TotsMoreMenuColumn("menu", [
				new TotsMoreMenuItem("edit", "Edit", "edit", "a_css_class"),
				new TotsMoreMenuItem("delete", "Eliminar", "delete"),
			])
		];

		// Assign data fetching function
		let data = new TotsListResponse();
		data.data = this.items;
    		this.config.obs = of(data).pipe(delay(1000));
	}

	protected onTableAction(action:TotsActionTable) {
		if (action.key == 'click-order') {
			// do something
		} else if (action.key == "page-change") {
			// do something
		}
	}
}
```