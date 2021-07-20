import {Component, Input, OnInit} from '@angular/core';
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {DataTemplatesService} from "../../../../../services/data-templates.service";

@Component({
  selector: 'app-pagination-switiching-templates',
  templateUrl: './pagination-switiching-templates.component.html',
  styleUrls: ['./pagination-switiching-templates.component.css']
})
export class PaginationSwitichingTemplatesComponent implements OnInit {
  @Input() totalItems: number;
  numberOfTemplatesOnPage: number;
  currentPage = 1;

  constructor(private templateService: DataTemplatesService) {
  }

  ngOnInit(): void {
    this.numberOfTemplatesOnPage = this.templateService.numberOfAvailableTemp;
  }

  pageChanged($event: PageChangedEvent) {
    this.currentPage = $event.page;
    this.templateService.setActiveTemplates($event.page);
  }
}
