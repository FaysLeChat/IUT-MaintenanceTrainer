import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from '@angular/common/http';
import {Questions} from '../interfaces/Questions';
import {QuestionService} from "../service/question.service";
import {ReponseService} from "../service/reponse.service";
import {Reponses} from "../interfaces/Reponses";
import {Router} from "@angular/router";
import {ToastService} from "../service/toast-service";
import {TranslateService} from "@ngx-translate/core";

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
  public timer:any;
  public nbplayers:any;
  public theme : string = "";
  public time: number = 0;
  questions!: Questions [];
  reponses!: Reponses [];

  public playersLives: number[] = [];
  public actualPlayer: number = 0;
  public playerAlive: number[] =  [];

  errorMessage = '';
  question : number =  Math.floor(Math.random() * 20);
  public IdQuestion : number = 1;
  tabQ : number[] = [this.question];
  show: any;

  public lang = localStorage.getItem('locale');

  constructor(private modalService: NgbModal,
              private http: HttpClient,
              private questionService: QuestionService,
              private reponseService: ReponseService,
              private router: Router,
              private toastService: ToastService,
              private translate: TranslateService) {
    this.questionService.getQuestionsSurvival().subscribe(res => {
      this.questions = res;
      this.reponses = [];
      let y = 0;
      for (let r of res) {
        this.reponseService.getReponse(r.id_question).subscribe( resR => {
          this.reponses.push(resR[0]);
          this.reponses.push(resR[1]);
          this.reponses.push(resR[2]);
          this.reponses.push(resR[3]);
          if(y != 0){
            for(let i = 0; i< this.reponses.length ; i++){
              // @ts-ignore
              if(this.reponses[i].id_question > this.reponses[i+1].id_question){
                var temp;
                temp = this.reponses[i].id_question;
                this.reponses[i].id_question = this.reponses[i+1].id_question;
                this.reponses[i+1].id_question = temp;
              }
            }
          }
          y++;
        });
      }
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('survival_config')) {
      this.config = localStorage.getItem('survival_config');
      this.activetimer = localStorage.getItem('survival_activetimer');
      this.nbplayers = localStorage.getItem('survival_nbplayers');
      // @ts-ignore
      this.playersLives = localStorage.getItem('survival_lives').split(',');
      // @ts-ignore
      this.actualPlayer = parseInt(localStorage.getItem('survival_actualplayer'));
      // @ts-ignore
      this.playerAlive = localStorage.getItem('survival_playeralive').split(',');

      // @ts-ignore
      this.IdQuestion = parseInt(localStorage.getItem('survival_idquestion'));

      if(this.activetimer == 'true') {
        // @ts-ignore
        this.timer = parseInt(localStorage.getItem('survival_timer'));
        this.interval = setInterval(() => {
          localStorage.setItem('survival_timer', String(this.timer++));
        }, 1000)
      }
    } else {
      this.resetGame();
    }
  }

  switchTimer() {
    if(this.activetimer == 'true') this.activetimer = 'false';
    else if(this.activetimer == 'false') this.activetimer = 'true';
  }

  incIdQuestion(){
    this.IdQuestion++;
    localStorage.setItem('survival_idquestion', String(this.IdQuestion));
    return this.IdQuestion;
  }

  IncQuestion(reponse: Reponses, n : number){
    this.valid(reponse, n);

    let r =  Math.floor((Math.random() * n));
    let boucle: boolean;

    if(this.tabQ.length == n) boucle = false;
    else boucle = true;

    while(boucle) {
      if (!this.tabQ.includes(r)) {
        this.tabQ.push(r);
        this.incIdQuestion();

        return this.question = r;
      }
      r =  Math.floor((Math.random() * n));
    }
    return 0;
  }

  envoyer()  {
    this.show = true;
    // @ts-ignore
    if(this.model >= 2 && this.model <= 10) { // Si les conditions obligatoires de la configuration sont remplises
      // Ajout du nombre de joueurs en sauvegarde locale + var
      this.nbplayers = this.model;
      localStorage.setItem('survival_nbplayer', this.nbplayers);

      // Ajout du nombre de vies en sauvegarde locale + var
      for(let i = 0; i < this.model; i++) {
        // @ts-ignore
        this.playersLives.push(2);
      }
      localStorage.setItem('survival_lives', this.playersLives.toString());

      // Si le timer est coché dans la configurationw
      if(this.activetimer == 'true') {
        localStorage.setItem('survival_activetimer', "true");
        this.timer = '0';
        localStorage.setItem('survival_timer', this.timer);
        this.interval = setInterval(() => {
          localStorage.setItem('survival_timer', String(this.timer++));
        }, 1000)
      }

      // Joueur actuel
      this.actualPlayer = 1;
      localStorage.setItem('survival_actualplayer', String(this.actualPlayer));

      // Joueurs en vie
      for(let i = 1; i <= this.model; i++) {
        this.playerAlive.push(i);
      }
      localStorage.setItem('survival_playeralive', this.playerAlive.toString());

      // ID Question
      this.IdQuestion = 1;
      localStorage.setItem('survival_idquestion', String(this.IdQuestion));

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
    localStorage.removeItem('survival_actualplayer');
    localStorage.removeItem('survival_playeralive');
    this.playerAlive = [];
    this.actualPlayer = 0;
    this.playersLives = [];
    this.config = 'false';
    this.activetimer = 'false';
    this.timer = '0';
  }

  isAlive(i:number) {
    return this.playerAlive.includes(i);
  }

  valid(reponse: Reponses, n: number) {
    if(this.tabQ.length == n){
      alert(this.translate.instant('survival.alert.endgame'));
      this.resetGame();
      this.router.navigateByUrl('');
    }

    if(reponse.valid != true) {
      this.playersLives[this.actualPlayer - 1]--;
      if (this.playersLives[this.actualPlayer - 1] >= 1) {
        this.toastService.show("Le Joueur " + this.actualPlayer + " a perdu une vie. Il lui reste encore " + this.playersLives[this.actualPlayer-1] + " vie(s) !", { classname: 'bg-danger text-light', delay: 10000 });
      } else {
        this.toastService.show("Le Joueur " + this.actualPlayer + " est éliminé.", { classname: 'bg-dark text-light', delay: 10000 });
        this.playerAlive.splice(this.playerAlive.indexOf(this.actualPlayer), 1);
      }
    } else {
      this.toastService.show("Réponse correcte pour le Joueur " + this.actualPlayer + " !", { classname: 'bg-success text-light', delay: 10000 });
    }

    if(this.playerAlive.length != 0) {
      if(this.actualPlayer > this.nbplayers) this.actualPlayer = 1;
      else this.actualPlayer++;
      while (!this.isAlive(this.actualPlayer)) {
        if(this.actualPlayer > this.nbplayers) this.actualPlayer = 1;
        else this.actualPlayer++;
      }
    } else {
      alert(this.translate.instant('survival.alert.allplayereliminated'));
      this.resetGame();
      this.router.navigateByUrl('');
    }

    localStorage.setItem('survival_actualplayer', String(this.actualPlayer));
    localStorage.setItem('survival_lives', this.playersLives.toString());
    localStorage.setItem('survival_playeralive', this.playerAlive.toString());
  }
}

