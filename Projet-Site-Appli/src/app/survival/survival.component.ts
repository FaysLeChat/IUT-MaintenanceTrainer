import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, Observable, Subject} from "rxjs";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Categories } from '../interfaces/Categories';
import { HttpClient } from '@angular/common/http';
import { Questions } from '../interfaces/Questions';
import {QuestionService} from "../service/question.service";
import {Reponses} from "../interfaces/Reponses";

@Component({
  selector: 'app-survival',
  templateUrl: './survival.component.html',
  styleUrls: ['./survival.component.css']
})
export class SurvivalComponent implements OnInit {
  public joueurs: any;
  public model: any;
  public tab_create = false;
  public timer : boolean = false;

  public config = true;
  public theme : string = "";

  public interval: any;
  public time: number = 0;

  public aRepondu : boolean = false;

  questions!: Questions [];

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

  constructor(private modalService: NgbModal, private http: HttpClient,private questionService: QuestionService) {
    this.questionService.getQuestionsSurvival().subscribe(res => this.questions = res);
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

  switchTimer() {
    if(this.timer) this.timer = false;
    else this.timer = true;
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
    this.joueurs = this.model;
    if(this.joueurs >= 2 && this.joueurs <= 10) {
      this.tab_create = true;
    } else {
      return this.errorMessage = "Le nombre de joueurs doit être compris entre 2 et 10 !"
    }
    if(this.timer) {
      this.interval = setInterval(() => {
        this.time++;
      }, 1000)
    }
    return true;
  }

  verificationReponse(reponse: Reponses) {
    if(reponse.valid == true) {
      console.log("cool");
    } else {
      console.log("pas cool :(");
    }
  }
}

