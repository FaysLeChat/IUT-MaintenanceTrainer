import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {Overlay} from "./overlay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projet-Site-Appli';
  nb_joueur = 0;

  constructor(private translate: TranslateService) {
    translate.addLangs(['fr', 'en']);
    if (localStorage.getItem('locale')) {
      // @ts-ignore: Object is possibly 'null'.
      var local: string = localStorage.getItem('locale').toString();
      translate.setDefaultLang(local);
      translate.use(local);
    } else {
      translate.setDefaultLang('fr');
      translate.use('fr');
      localStorage.setItem('locale', 'fr');
      // @ts-ignore: Object is possibly 'null'.
      this.choice = localStorage.getItem('locale').toString();
    }
  }


  public isCollapsed = false;
}
