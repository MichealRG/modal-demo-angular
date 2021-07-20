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
  subOnTemplates: Subscription;

  templates: TemplateModel[] = [];
  availableTemp: TemplateModel[] = [];
  nameOfJsonFile: string;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef, private templatesService: DataTemplatesService) {
  }

  ngOnInit(): void {
    this.templates = this.templatesService.templatesData;
    this.availableTemp=this.templatesService.availableTemplates;
    this.subOnTemplates = this.templatesService.availableTemp.subscribe(templates=>{
      this.availableTemp=templates;
    });
  }

  ngOnDestroy(): void {
    this.subOnTemplates.unsubscribe();
  }

}
