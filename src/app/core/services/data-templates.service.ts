import {Injectable} from '@angular/core';
import {TemplateModel} from "../shared/template.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataTemplatesService {
  templatesData: TemplateModel[];
  aviabletempaltes: TemplateModel[]
  nameOfFile: string;
  activeUrl: string;
  activeVersion: number;
  prevVersion: number;
  prevUrl: string;
  activatedVersion = new Subject<{ current: string, prev: string, actVers: number, prevVers: number }>();
  avaliableTemp = new Subject<TemplateModel[]>();
  amountOfTemplates: number;
  numberOfAvaliableTemp = 8;

  constructor() {
  }

  loadData(setOfData: TemplateModel[], fileName: string) {
    this.templatesData = setOfData;

    this.CalculateTime();
    this.setIds();

    this.activeUrl = this.templatesData[0].url;
    this.prevUrl = this.templatesData.length > 1 ? this.templatesData[1].url : "";
    this.activeVersion = this.templatesData[0].version;
    this.prevVersion = this.templatesData[1].version;

    this.amountOfTemplates = this.templatesData.length;

    this.nameOfFile = fileName;

    this.aviabletempaltes = this.templatesData.slice(0, this.numberOfAvaliableTemp);

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
    this.avaliableTemp.next(this.templatesData.slice((ind - 1) * this.numberOfAvaliableTemp, ind * this.numberOfAvaliableTemp));
  }

  private CalculateTime() {
    let calcDate: string;
    for (let data of this.templatesData) {
      calcDate = String(Math.floor((Date.now() - new Date(data.creationDate).getTime()) / 1000 / 60 / 60 / 24));
      data.creationDate = calcDate;
    }
    this.sortData('date');
    for (let data of this.templatesData) {
      calcDate = Math.floor(Number(data.creationDate)) > 30 ?
        Math.floor(Number(data.creationDate) / 30) + "M" : data.creationDate + "D";
      calcDate = Math.floor(Number(calcDate.slice(0, calcDate.length - 1))) > 12 && !calcDate.includes('D') ?
        Math.floor(Number(calcDate.slice(0, calcDate.length - 1)) / 12) + "Y" : calcDate;
      data.creationDate = calcDate;
    }
  }

  private sortData(date: string) {
    if (date === 'date') {
      this.templatesData.sort((val1, val2) =>
        Number(val1.creationDate) - Number(val2.creationDate) ||
        val2.version - val1.version);
    }
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
