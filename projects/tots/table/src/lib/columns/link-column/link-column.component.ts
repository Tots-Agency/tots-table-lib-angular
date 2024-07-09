import { Component, OnInit } from '@angular/core';
import { TotsBaseColumnComponent } from '../tots-base-column.component';

@Component({
	selector: 'tots-link-column',
	templateUrl: './link-column.component.html',
	styleUrls: ['./link-column.component.css']
})
export class LinkColumnComponent extends TotsBaseColumnComponent implements OnInit {

	protected linkCaption! : string;
	protected target! : "_blank"|"_self";

	ngOnInit() {
		this.linkCaption = this.column.extra?.caption || "Open in new tab";
		this.target = this.column.extra?.target || "_blank";
	}

}