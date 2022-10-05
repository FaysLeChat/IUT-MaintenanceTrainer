import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Questions} from "../interfaces/Questions";
import { Reponses } from '../interfaces/Reponses';
import {QuestionService} from "../service/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  // Variables de jeu
  public config:any;
  public maxscore = 100;
  public resultat:number = 0;
  public theme:String[] = [];


  public errorMessage = "";
  questions!: Questions [];
  reponses!: Reponses [];
  // @ts-ignore
  langue: string = localStorage.getItem("locale").toString();
  score: number = 0;

  constructor(private modalService: NgbModal, private http: HttpClient, private questionService : QuestionService, private router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('simulation_config')) { // Si une partie existante est trouvée
      console.log("Une game est déjà enregistrée, retour à la partie précédente... Cliquez sur RESET pour en recommencer une nouvelle");

      // Récupération des thèmes précédents sélectionnés
      // @ts-ignore
      this.theme = localStorage.getItem('simulation_themes').split(',');
      console.log("DEBUG: Affichage tableau des thèmes récupérés = ", this.theme);

      // Récupération du score sauvegardé en local
      // @ts-ignore
      this.resultat = parseInt(localStorage.getItem('simulation_score'));

      // Récupération de la configuration
      this.config = localStorage.getItem('simulation_config');
      console.log("DEBUG: La config actuelle est à ", this.config);

    } else { // Sinon si la partie n'est pas crée
      // On réinitialise la partie
      this.resetGame();
    }
  }

  creerQuestion() : number{
    let cul = Math.random();
    if(cul == 0){
      cul = 1;
    }
    // let question : number = Math.floor(cul * 10);
    let question : number = 0;
    return question;
  }

  question : number = this.creerQuestion();
  IdQuestion : number = 1;
  tabQ : number[] = [this.question];


  IncQuestion( n: number){
    let r =  Math.floor((Math.random() * n));
    let boucle: boolean;

    if(this.tabQ.length == n){
      boucle = false;
    } else {
      boucle = true;
    }

    while(boucle) {
      if (!this.tabQ.includes(r)) {
        this.tabQ.push(r);
        this.incIdQuestion();
        //console.log(r)
        return this.question = r;
      }
      r =  Math.floor((Math.random() * n));
    }
    return 0;
  }

  RecupQuestion() {
    this.reponses = [];
    this.questions = [];
    for(let y of this.theme){
      let u =0;
      console.log(y);
      this.questionService.getCategorie(y).subscribe(r=>{
          console.log(r);
          this.questionService.getQuestionSimulation(r[0].id_categorie).subscribe(res => {
            console.log(res.length);
            console.log(res);
            while(u < res.length){
              this.questions.push(res[u]);
              u++;
            }
            console.log(this.reponses)
          });
        }
      );
    }
  }
  incIdQuestion(){
    return this.IdQuestion++;
  }



  ajout(score : number,n : number){
    if (document.getElementById('note')) {
      this.resultat += score;
      localStorage.setItem('simulation_score', String(this.resultat));
      return this.resultat;
    }
    if(this.tabQ.length == n && this.langue == "fr"){
      alert("Entraînement terminé ! Ton score est de : "+this.score+"/"+this.questions.length);
      this.router.navigateByUrl('');
    }
    if(this.tabQ.length == n && this.langue == "en"){
      alert("Training complete! Your score is : "+this.score+"/"+this.questions.length);
      this.router.navigateByUrl('');
    }
    return 0;
  }

  openmodal(content: any) {
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title-2'});
  }

  switchTheme(theme:any) {
    if(this.theme.includes(theme)) this.theme.splice(this.theme.indexOf(theme), 1);
    else this.theme.push(theme);
    console.log(this.theme);
  }

  envoyer()  {
    if(this.theme.length == 0) {
      console.log("Erreur : Aucun thème sélectionné");
    } else {
      // Initialisation du score en sauvegarde locale + var
      this.resultat = 0;
      localStorage.setItem('simulation_score', String(this.resultat));

      // Sauvegarde des thèmes sélectionnés en local
      localStorage.setItem('simulation_themes', this.theme.toString());

      // Validation de la configuration actuelle
      this.config = 'true';
      localStorage.setItem('simulation_config', this.config);

      this.modalService.dismissAll();
      this.RecupQuestion();
    }
    return true;
  }

  resetGame() {
    localStorage.setItem('simulation_config', 'false');
    localStorage.removeItem('simulation_score');
    this.theme = [];
    this.config = 'false';
  }

}
