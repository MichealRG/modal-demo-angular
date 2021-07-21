import {Injectable} from '@angular/core';
import {TemplateModel} from "../shared/template.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataTemplatesService {
  /**
   * Set of data to manage
   */
  templatesData: TemplateModel[] = [];
  /**
   * Set of data available on UI view
   */
  availableTemplates: TemplateModel[]
  /**
   * Name of loaded data set
   */
  nameOfFile = "";
  /**
   * Url to actual pointed template on UI
   */
  activeUrl: string;
  /**
   * Version of actual pointed template on UI
   */
  activeVersion: number;
  /**
   * Version of previous added template  on UI
   */
  prevVersion: number;
  /**
   * Url to previous added template  on UI
   */
  prevUrl: string;
  /**
   * Subject to monitoring changes on UI (change of actual chosen templates)
   */
  activatedVersion = new Subject<{ current: string, prev: string, actVers: number, prevVers: number }>();
  /**
   * Subject to monitoring changes on UI (available templates on page)
   */
  availableTemp = new Subject<TemplateModel[]>();
  /**
   * Amount of all accessible templates
   */
  amountOfTemplates: number;
  /**
   * Amount of templates displaying in modal
   */
  numberOfAvailableTemp = 8;

  constructor() {
  }

  /**
   * Method which loading data set into paramas
   * @param setOfData set of data which has to be the type of TemplateModel
   * @param fileName name of data set
   */
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

  /**
   * Method to change actual displayed template
   * @param index index pointing to the template to be displayed
   */
  changeActiveTemplate(index: number) {
    this.activeUrl = this.templatesData[index].url;
    this.prevUrl = index < this.templatesData.length - 1 ? this.templatesData[index + 1].url : "assets/imgs/TempEmpty.png";

    this.activeVersion = this.templatesData[index].version;
    this.prevVersion = index < this.templatesData.length - 1 ? this.templatesData[index + 1].version : -1;

    this.subSubjectTemplates();
  }

  /**
   * Method to change the set of available tempaltes
   * @param ind number representing the currently displayed page
   */
  setActiveTemplates(ind: number) {
    this.availableTemp.next(this.templatesData.slice((ind - 1) * this.numberOfAvailableTemp, ind * this.numberOfAvailableTemp));
  }

  /**
   * Auxiliary Method to adjust dates to displaying format
   */
  private CalculateTime() {
    this.sortData();

    for (let data of this.templatesData) {
      data.creationDate = (Date.now() - new Date(data.creationDate).getTime()) / 1000 / 60 / 60 / 24 < 31 ?
        (Math.floor((Date.now() - new Date(data.creationDate).getTime()) / 1000 / 60 / 60 / 24) + "D") :
        data.creationDate + "M";
    }
  }

  /**
   * Auxiliary method to sort templates by dates and then by version
   */
  private sortData(): TemplateModel[] {
    return this.templatesData.sort((val1, val2) =>
      new Date(val2.creationDate).getTime() - new Date(val1.creationDate).getTime() ||
      val2.version - val1.version);
  }

  /**
   * Auxiliary method for changeActiveTemplate method
   */
  private subSubjectTemplates() {
    this.activatedVersion.next({
      current: this.activeUrl,
      prev: this.prevUrl,
      actVers: this.activeVersion,
      prevVers: this.prevVersion
    });
  }

  /**
   * Auxiliary method to set ids of templates
   */
  private setIds() {
    let index = 0;
    for (let temp of this.templatesData) {
      temp.id = index;
      index++;
    }
  }
}
