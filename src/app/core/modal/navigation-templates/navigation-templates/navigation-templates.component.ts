import {Component, Input, OnInit} from '@angular/core';
import {TemplateModel} from "../../../shared/template.model";
import {DataTemplatesService} from "../../../services/data-templates.service";

@Component({
  selector: 'app-navigation-templates',
  templateUrl: './navigation-templates.component.html',
  styleUrls: ['./navigation-templates.component.css']
})
export class NavigationTemplatesComponent implements OnInit {
  /**
   * Data od single template
   */
  @Input() template: TemplateModel;

  /**
   * The constructor class navigation-templates
   * @param templateService dateTemplate service (to manage templates)
   */
  constructor(private templateService: DataTemplatesService) { }

  ngOnInit(): void {

  }

  /**
   * Changing the value in subject to different template (chosen by user)
   */
  changeActiveTemplate() {
    this.templateService.changeActiveTemplate(this.template.id);
  }
}
