import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projet-Site-Appli';

  constructor(private translate: TranslateService, private modalService: NgbModal) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use('fr');
    this.selectedLang = "fr";
  }

  public isCollapsed = false;
  selectedLang: any;

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onChange(deviceValue: any) {
    this.selectedLang = deviceValue;
    console.log(this.selectedLang)
    this.translate.use(deviceValue);
  }
}
