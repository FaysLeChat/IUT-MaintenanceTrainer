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
  nb_joueur = 0;

  
  

  constructor(private translate: TranslateService, private modalService: NgbModal) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use('fr');
    this.selectedLang = "fr";
  }

  public isCollapsed = false;
<<<<<<< Projet-Site-Appli/src/app/app.component.ts

  tab(): void {
    var tab_create = false;
    var tabSurvie = new Array(this.nb_joueur);
    if(this.nb_joueur >= 2 && this.nb_joueur <=10){
      for(var i=1;i<tabSurvie.length;i++){
        tabSurvie.push(i);
        tab_create = true;
    }
    }
    
=======
  selectedLang: any;

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onChange(deviceValue: any) {
    this.selectedLang = deviceValue;
    console.log(this.selectedLang)
    this.translate.use(deviceValue);
>>>>>>> Projet-Site-Appli/src/app/app.component.ts
  }
}
