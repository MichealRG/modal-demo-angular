import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {DataTemplatesService} from "../services/data-templates.service";
import {TemplateModel} from "../shared/template.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  /**
   * Subscription to chaining templates
   */
  subOnTemplates: Subscription;

  /**
   * The set of templates downloaded from service
   */
  templates: TemplateModel[] = [];
  /**
   * The set of available templates on UI
   */
  availableTemp: TemplateModel[] = [];
  /**
   * Name of templates set
   */
  nameOfJsonFile: string;

  /**
   * The constructor class modal compoennet
   * @param bsModalRef reference to modal - used to close the modal in html
   * @param templatesService dateTemplate service (to manage templates)
   */
  constructor(public bsModalRef: BsModalRef, private templatesService: DataTemplatesService) {
  }

  /**
   *On init event handler,
   *setting default params in .ts file, and subscribing the subject
   */
  ngOnInit(): void {
    this.templates = this.templatesService.templatesData;
    this.availableTemp=this.templatesService.availableTemplates;
    this.subOnTemplates = this.templatesService.availableTemp.subscribe(templates=>{
      this.availableTemp=templates;
    });
  }

  /**
   * On destroy event handler,
   * closing subscription of the subject
   */
  ngOnDestroy(): void {
    this.subOnTemplates.unsubscribe();
  }

}
