import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survival',
  templateUrl: './survival.component.html',
  styleUrls: ['./survival.component.css']
})
export class SurvivalComponent implements OnInit {
    tab_create = false;
    



  constructor() { 
  }

  ngOnInit(): void {
  }
  tab(): void {
    var nb_joueur = 0
    //nb_joueur =document.getElementById("nbj");
    //var tabSurvie = new Array(nb_joueur);
    if(nb_joueur >= 2 && nb_joueur <=10){
        this.tab_create = true;
    }
    }
    
  }



