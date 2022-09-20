import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, Subject} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-survival',
  templateUrl: './survival.component.html',
  styleUrls: ['./survival.component.css']
})
export class SurvivalComponent implements OnInit {
  public joueurs: any;
  public model: any;
  public tab_create = false;

  public interval: any;
  public time: number = 0;



  constructor() {
  }

  ngOnInit(): void {
    this.time = 0;
  }

  tab(): void {
    var nb_joueur = 0
    //nb_joueur =document.getElementById("nbj");
    //var tabSurvie = new Array(nb_joueur);
    if(nb_joueur >= 2 && nb_joueur <=10){
        this.tab_create = true;
    }
  }



  errorMessage = '';

  envoyer()  {
    this.joueurs = this.model;
    if(this.joueurs >= 2 && this.joueurs <= 10) {
      this.tab_create = true;
    } else {
      return this.errorMessage = "Le nombre de joueurs doit être compris entre 2 et 10 !"
    }
    this.interval = setInterval(() => {
      this.time++;
    },1000)
    return true;
  }
}
