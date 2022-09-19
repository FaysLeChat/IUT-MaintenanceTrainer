import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  francais = true;
  title = 'Projet-Site-Appli';
  nb_joueur = 0;

  
  

  translate(): void {
    this.francais = !this.francais;
    console.log(this.francais);
  }

  public isCollapsed = false;

  tab(): void {
    var tab_create = false;
    var tabSurvie = new Array(this.nb_joueur);
    if(this.nb_joueur >= 2 && this.nb_joueur <=10){
      for(var i=1;i<tabSurvie.length;i++){
        tabSurvie.push(i);
        tab_create = true;
    }
    }
    
  }
}
