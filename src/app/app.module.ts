import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { ModalComponent } from './core/modal/modal.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { NavigationTemplatesComponent } from './core/modal/navigation-templates/navigation-templates/navigation-templates.component';
import { TemplateCompererComponent } from './core/modal/templateComperer/template-comperer/template-comperer.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import { PaginationSwitichingTemplatesComponent } from './core/modal/navigation-templates/navigation-templates/Pagination/pagination-switiching-templates/pagination-switiching-templates.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    ModalComponent,
    NavigationTemplatesComponent,
    TemplateCompererComponent,
    PaginationSwitichingTemplatesComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
