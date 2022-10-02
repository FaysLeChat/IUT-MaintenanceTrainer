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
  public maxscore = 100;
  public errorMessage = "";
  resultat = 0;
  changement = false;
  questions!: Questions [];
  reponses!: Reponses [];

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.getQuestions().subscribe(req => this.questions = req);
    this.getReponses().subscribe(req => this.reponses = req);
  }

  ngOnInit(): void {

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

}
