import {Component, Input, OnInit} from '@angular/core';
import {TemplateModel} from "../../../shared/template.model";
import {DataTemplatesService} from "../../../services/data-templates.service";

@Component({
  selector: 'app-navigation-templates',
  templateUrl: './navigation-templates.component.html',
  styleUrls: ['./navigation-templates.component.css']
})
export class NavigationTemplatesComponent implements OnInit {
  @Input() template: TemplateModel;

  constructor(private templateService: DataTemplatesService) { }

  ngOnInit(): void {

  }

  changeActiveTemplate() {
    this.templateService.changeActiveTemplate(this.template.id);
  }
}
