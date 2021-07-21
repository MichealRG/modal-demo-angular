import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalComponent} from "./modal/modal.component";
import data from '../../assets/data2.json';
import {DataTemplatesService} from "./services/data-templates.service";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  /**
   *Referation for modal object
   * */
  bsModalRef: BsModalRef;

  /**
   * CoreComponenet class Constructor - injecting Modal Service and DateTemplate service (to manage templates)
   */
  constructor(private modalService: BsModalService, private dataService: DataTemplatesService) {
  }

  ngOnInit(): void {
  }

  /**
   * Prepare initial state for modal and then open it and saved the state into bsModal referance
   * */
  openModal() {
    const initialState = {
      templates: this.dataService.templatesData,
      nameOfJsonFile: this.dataService.nameOfFile
    };
    const modalOptions = {initialState: initialState, class: 'modal-xlg'}
    this.bsModalRef = this.modalService.show(ModalComponent, modalOptions);
  }

  /**
   * Load data from data.json into template service
   */
  loadData() {
    this.dataService.loadData(data, "data2.json");
  }
}
