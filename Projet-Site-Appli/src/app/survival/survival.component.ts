import {Component, OnInit, ViewChild} from '@angular/core';
import {isNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {debounceTime, Observable, Subject} from "rxjs";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Categories } from '../interfaces/Categories';
import { HttpClient } from '@angular/common/http';
import { Questions } from '../interfaces/Questions';
import {QuestionService} from "../service/question.service";
import {ReponseService} from "../service/reponse.service";
import {Reponses} from "../interfaces/Reponses";


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
  public tab_create = false;
  public theme : string = "";
  public time: number = 0;
  public aRepondu : boolean = false;
  questions!: Questions [];
  reponses!: Reponses [];


  endconf(choix:any) {
    this.theme = choix;
    this.config = false;
    this.modalService.dismissAll();
    console.log(this.theme);
    if(this.timer) {
      this.interval = setInterval(() => {
        this.time++;
      },1000)
    }
  }

  constructor(private modalService: NgbModal, private http: HttpClient,private questionService: QuestionService,private reponseService: ReponseService) {
    this.questionService.getQuestionsSurvival().subscribe(res => {
      this.questions = res;
      this.reponses = [];
      console.log(this.questions);
      let i = [];
      let y = 0;
      for (let r of res) {
        this.reponseService.getReponse(r.id_question).subscribe( resR => {
          this.reponses.push(resR[0]);
          this.reponses.push(resR[1]);
          this.reponses.push(resR[2]);
          this.reponses.push(resR[3]);
          console.log(this.reponses);
          if(y !=0){
            for(let i = 0; i< this.reponses.length ; i++){ 
            if(this.reponses[i].id_question > this.reponses[i+1].id_question){
              var temp;
              temp = this.reponses[i].id_question;
              this.reponses[i].id_question = this.reponses[i+1].id_question;
              this.reponses[i+1].id_question = temp;
            }
          }  
          }
          y++;
              
        }
        );
      }
    }
    );


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
  bool: boolean = true;
  question : number =  Math.floor(Math.random() * 20);
  IdQuestion : number = 1;
  tabQ : number[] = [this.question];

  incIdQuestion(){
    return this.IdQuestion++;
  }
  IncQuestion(){
    let r =  Math.floor((Math.random() * 20));
    while(true) {
      if (!this.tabQ.includes(r)) {
        this.tabQ.push(r);
        this.incIdQuestion();
        return this.question = r;
      }
      r =  Math.floor((Math.random() * 20));
    }
    return 0;
  }

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
  verificationReponse(reponse: Reponses) {
    if(reponse.valid == true) {
      console.log("cool");
    } else {
      console.log("pas cool :(");
    }
  }
}

