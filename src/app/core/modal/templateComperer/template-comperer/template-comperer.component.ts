import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataTemplatesService} from "../../../services/data-templates.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-template-comperer',
  templateUrl: './template-comperer.component.html',
  styleUrls: ['./template-comperer.component.css']
})
export class TemplateCompererComponent implements OnInit, OnDestroy {
  /**
   * The url of currently displayed template
   */
  currentTemp: string;
  /**
   * The url to previous templates version
   */
  prevTemp: string;
  /**
   * The number representing currently displayed template (version number)
   */
  currentVersion: number;
  /**
   * The number representing previous displayed template (version number)
   */
  prevVersion: number;
  // isFirst = false;
  /**
   * Subscription to observing changes in currently displayed template
   */
  templateDataStore: Subscription;

  /**
   * The constructor class template-comperer
   * @param templateService dateTemplate service (to manage templates)
   */
  constructor(private templateService: DataTemplatesService) {
  }

  /**
   * OnDestroy event handler,
   * to unsubscribe the subject
   */
  ngOnDestroy(): void {
    this.templateDataStore.unsubscribe();
  }

  /**
   * OnInit event handler,
   * to set data needed to compare two templates
   */
  ngOnInit(): void {
    this.templateDataStore = this.templateService.activatedVersion.subscribe(templates => {
      this.currentTemp = templates.current;
      this.prevTemp = templates.prev;
      this.currentVersion = templates.actVers;
      this.prevVersion = templates.prevVers;
      // this.isFirst = templates.prev === 'assets/imgs/TempEmpty.png' ? true : false;
    })
    this.currentTemp = this.templateService.activeUrl;
    this.prevTemp = this.templateService.prevUrl;
    this.currentVersion = this.templateService.activeVersion;
    this.prevVersion = this.templateService.prevVersion;
  }

}
