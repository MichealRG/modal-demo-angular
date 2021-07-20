import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataTemplatesService} from "../../../services/data-templates.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-template-comperer',
  templateUrl: './template-comperer.component.html',
  styleUrls: ['./template-comperer.component.css']
})
export class TemplateCompererComponent implements OnInit, OnDestroy {
  currentTemp: string;
  prevTemp: string;
  currentVersion: number;
  prevVersion: number;
  // isFirst = false;
  templateDataStore: Subscription;

  constructor(private templateService: DataTemplatesService) {
  }

  ngOnDestroy(): void {
    this.templateDataStore.unsubscribe();
  }

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
