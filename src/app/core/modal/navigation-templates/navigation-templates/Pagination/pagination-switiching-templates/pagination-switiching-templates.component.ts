import {Component, Input, OnInit} from '@angular/core';
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {DataTemplatesService} from "../../../../../services/data-templates.service";

@Component({
  selector: 'app-pagination-switiching-templates',
  templateUrl: './pagination-switiching-templates.component.html',
  styleUrls: ['./pagination-switiching-templates.component.css']
})
export class PaginationSwitichingTemplatesComponent implements OnInit {
  /**
   * The number of all available templates
   */
  @Input() totalItems: number;
  /**
   * The number of templates on a single page
   */
  numberOfTemplatesOnPage: number;
  /**
   * Currently displayed number of site
   */
  currentPage = 1;

  /**
   * The constructor class navigation-templates
   * @param templateService dateTemplate service (to manage templates)
   */
  constructor(private templateService: DataTemplatesService) {
  }

  /**
   * Event handler for OnInit
   * Setting the numberOfTempaltesOnPage
   */
  ngOnInit(): void {
    this.numberOfTemplatesOnPage = this.templateService.numberOfAvailableTemp;
  }

  /**
   * Method to change the currently displaying page
   * @param $event event param storing the value of new page
   */
  pageChanged($event: PageChangedEvent) {
    this.currentPage = $event.page;
    this.templateService.setActiveTemplates($event.page);
  }
}
