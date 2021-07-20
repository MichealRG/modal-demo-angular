import {Injectable} from '@angular/core';
import {TemplateModel} from "../shared/template.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataTemplatesService {
  templatesData: TemplateModel[];
  availableTemplates: TemplateModel[]
  nameOfFile: string;
  activeUrl: string;
  activeVersion: number;
  prevVersion: number;
  prevUrl: string;
  activatedVersion = new Subject<{ current: string, prev: string, actVers: number, prevVers: number }>();
  availableTemp = new Subject<TemplateModel[]>();
  amountOfTemplates: number;
  numberOfAvailableTemp = 8;

  constructor() {
  }

  loadData(setOfData: TemplateModel[], fileName: string) {
    this.templatesData = JSON.parse(JSON.stringify(setOfData));

    this.CalculateTime();
    this.setIds();

    this.activeUrl = this.templatesData[0].url;
    this.prevUrl = this.templatesData.length > 1 ? this.templatesData[1].url : "";
    this.activeVersion = this.templatesData[0].version;
    this.prevVersion = this.templatesData[1].version;

    this.amountOfTemplates = this.templatesData.length;

    this.nameOfFile = fileName;

    this.availableTemplates = this.templatesData.slice(0, this.numberOfAvailableTemp);

    this.subSubjectTemplates();
  }


  changeActiveTemplate(index: number) {
    this.activeUrl = this.templatesData[index].url;
    this.prevUrl = index < this.templatesData.length - 1 ? this.templatesData[index + 1].url : "assets/imgs/TempEmpty.png";

    this.activeVersion = this.templatesData[index].version;
    this.prevVersion = index < this.templatesData.length - 1 ? this.templatesData[index + 1].version : -1;

    this.subSubjectTemplates();
  }

  setActiveTemplates(ind: number) {
    this.availableTemp.next(this.templatesData.slice((ind - 1) * this.numberOfAvailableTemp, ind * this.numberOfAvailableTemp));
  }

  private CalculateTime() {
    this.sortData();

    for (let data of this.templatesData) {
      data.creationDate = (Date.now() - new Date(data.creationDate).getTime())/1000/60/60/24 < 31 ?
        (Math.floor((Date.now() - new Date(data.creationDate).getTime())/1000/60/60/24) + "D"):
        data.creationDate+"M";
    }
  }

  private sortData(): TemplateModel[] {
      return this.templatesData.sort((val1, val2) =>
        new Date(val2.creationDate).getTime() - new Date(val1.creationDate).getTime()||
        val2.version - val1.version);
  }

  private subSubjectTemplates() {
    this.activatedVersion.next({
      current: this.activeUrl,
      prev: this.prevUrl,
      actVers: this.activeVersion,
      prevVers: this.prevVersion
    });
  }

  private setIds() {
    let index = 0;
    for (let temp of this.templatesData) {
      temp.id = index;
      index++;
    }
  }
}
