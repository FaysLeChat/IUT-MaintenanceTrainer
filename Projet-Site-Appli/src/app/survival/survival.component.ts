import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, Observable, Subject} from "rxjs";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Categories } from '../interfaces/Categories';
import { HttpClient } from '@angular/common/http';
import { Questions } from '../interfaces/Questions';

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

  getQuestions(): Observable<any> {
    var url = 'http://45.155.170.233:3000/questions?survival_mode=eq.true';
    const tab = [];
    tab.push(url);
    for(var z = 2;z<tab.length;z++){
      if(this.aRepondu == true){
        tab[z] = tab[z+1];
      }
    }
    console.log(tab)
    return this.http.get(url);


  }


  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.getQuestions().subscribe(req => this.questions = req);
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
}
