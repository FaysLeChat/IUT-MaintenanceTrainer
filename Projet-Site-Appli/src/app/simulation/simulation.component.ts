import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Questions} from "../interfaces/Questions";
import { Reponses } from '../interfaces/Reponses';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  // Variables de jeu
  public config:any;
  public maxscore = 100;
  public resultat:any;
  public theme:String[] = [];


  public errorMessage = "";
  changement = false;
  questions!: Questions [];
  reponses!: Reponses [];

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.getQuestions().subscribe(req => this.questions = req);
    this.getReponses().subscribe(req => this.reponses = req);
  }

  ngOnInit(): void {
    if(localStorage.getItem('simulation_config')) { // Si une partie existante est trouvée
      console.log("Une game est déjà enregistrée, retour à la partie précédente... Cliquez sur RESET pour en recommencer une nouvelle");

      // Récupération de la configuration
      this.config = localStorage.getItem('simulation_config');
      console.log("DEBUG: La config actuelle est à ", this.config);

      this.resultat = localStorage.getItem('simulation_score');
    } else { // Sinon si la partie n'est pas crée
      // On réinitialise la partie
      this.resetGame();
    }
  }


  getQuestions(): Observable<any> {
    let url = 'http://45.155.170.233:3000/questions?eval_mode=eq.true&id_question=eq.1';
    return this.http.get(url);
  }

  getReponses(): Observable<any>{
    let url = 'http://45.155.170.233:3000/reponses?id_question=eq.1';
    return this.http.get(url);
  }

  changerQuestion(){
    if(this.changement == true){
      return (this.changement = false);
    }
    else{
      return (this.changement = true);
    }
  }

  ajout(score : number) {
    if (this.resultat < this.maxscore && document.getElementById('note')) {
      this.resultat += score;
      return this.resultat;
    } else {
      this.errorMessage = "Score maximum atteint !";
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
    // Initialisation du score en sauvegarde locale + var
    this.resultat = 0;
    localStorage.setItem('simulation_score', this.resultat);

    // Validation de la configuration actuelle
    this.config = 'true';
    localStorage.setItem('simulation_config', this.config);

    this.modalService.dismissAll();
    return true;
  }

  resetGame() {
    localStorage.setItem('simulation_config', 'false');
    localStorage.removeItem('simulation_score');
    this.config = 'false';
  }

}
