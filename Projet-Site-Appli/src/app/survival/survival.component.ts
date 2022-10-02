import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, Subject} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {isNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-survival',
  templateUrl: './survival.component.html',
  styleUrls: ['./survival.component.css']
})

export class SurvivalComponent implements OnInit {
  public model: any;

  // Variables de jeu
  public config:any;
  public activetimer:any;
  public interval:any;
  public lives:any;
  public timer:any;
  public nbplayers:any;

  constructor() {
  }

  ngOnInit(): void {
    if(localStorage.getItem('survival_config')) { // Si une partie existante est trouvée
      console.log("Une game est déjà enregistrée, retour à la partie précédente... Cliquez sur RESET pour en recommencer une nouvelle");

      // Récupération de la configuration
      this.config = localStorage.getItem('survival_config');
      console.log("DEBUG: La config actuelle est à ", this.config);

      // Récupération si le timer est activé ou non
      this.activetimer = localStorage.getItem('survival_activetimer');
      console.log("DEBUG: L'activation du timer est à ", this.config);

      this.nbplayers = localStorage.getItem('survival_nbplayers');
      this.lives = localStorage.getItem('survival_lives');

      // Si le timer est activé, on va recréer la boucle pour incrémenter le nombre de secondes
      if(this.activetimer == 'true') {
        // @ts-ignore
        this.timer = parseInt(localStorage.getItem('survival_timer'));
        this.interval = setInterval(() => {
          localStorage.setItem('survival_timer', String(this.timer++));
        }, 1000)
      }
    } else { // Sinon si la partie n'est pas crée
      // On réinitialise la partie
      this.resetGame();
    }
  }

  tab(): void {
    //nb_joueur =document.getElementById("nbj");
    //var tabSurvie = new Array(nb_joueur);
    // @ts-ignore
    if(localStorage.getItem('survival_nbplayer') >= 2 && localStorage.getItem('survival_nbplayer') <= 10){
      localStorage.setItem('survival_config', 'true');
      this.config = true;
    }
  }

  switchTimer() {
    if(this.activetimer == 'true') this.activetimer = 'false';
    else if(this.activetimer == 'false') this.activetimer = 'true';
  }

  errorMessage = '';

  envoyer()  {
    // @ts-ignore
    if(this.model >= 2 && this.model <= 10) { // Si les conditions obligatoires de la configuration sont remplises
      // Ajout du nombre de joueurs en sauvegarde locale + var
      this.nbplayers = this.model;
      localStorage.setItem('survival_nbplayer', this.nbplayers);

      // Ajout du nombre de vies en sauvegarde locale + var
      this.lives = '0';
      localStorage.setItem('survival_lives', this.lives);

      // Si le timer est coché dans la configuration
      if(this.activetimer == 'true') {
        localStorage.setItem('survival_activetimer', "true");
        this.timer = '0';
        localStorage.setItem('survival_timer', this.timer);
        this.interval = setInterval(() => {
          localStorage.setItem('survival_timer', String(this.timer++));
        }, 1000)
      }

      // Validation de la configuration actuelle
      this.config = 'true';
      localStorage.setItem('survival_config', this.config);
    } else {
      return this.errorMessage = "Le nombre de joueurs doit être compris entre 2 et 10 !"
    }
    return true;
  }

  resetGame() {
    localStorage.setItem('survival_config', 'false');
    localStorage.setItem('survival_activetimer', 'false');
    localStorage.removeItem('survival_nbplayer');
    localStorage.removeItem('survival_timer');
    localStorage.removeItem('survival_lives');
    this.config = 'false';
    this.activetimer = 'false';
    this.timer = '0';
  }
}
