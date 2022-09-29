import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Questions} from "../interfaces/Questions";
import {Categories} from "../interfaces/Categories";
import {query} from "@angular/animations";

import {QuestionService} from "../service/question.service";


@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.css']
})
export class EntrainementComponent implements OnInit {
  public config = true;
  public theme : string = "";
  public timer : boolean = false

  public interval: any;
  public time: number = 0;
  public selectedBac: any = "bac+2";

  questions: Questions = <Questions>{};
  tab: any[] = [];


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
    this.questionService.getCategorie(this.theme).subscribe(res =>this.questionService.getQuestionTraining(res[0].id_categorie).subscribe(map =>{
      this.questions=map;
      this.tab.push(map);
      console.log(this.tab[0])

    }));
    return this.tab;
    /*[
      [
        {
          "id_question": 23,
          "label_fr": "Qu est ce qu une base de données ?",
          "label_en": "What is a database ?",
          "id_categorie": 1,
          "id_difficulte": 1,
          "eval_mode": true,
          "training_mode": true,
          "survival_mode": true,
          "pro_tips_fr": null,
          "pro_tips_en": null
        },
        {
          "id_question": 24,
          "label_fr": "Qu est-ce qu un SGBD ?",
          "label_en": "What is a DBMS ?",
          "id_categorie": 1,
          "id_difficulte": 1,
          "eval_mode": true,
          "training_mode": true,
          "survival_mode": true,
          "pro_tips_fr": null,
          "pro_tips_en": null
        },
        {
          "id_question": 25,
          "label_fr": "Qu est-ce qu un SGBDR ?",
          "label_en": "What is an RDBMS ?",
          "id_categorie": 1,
          "id_difficulte": 2,
          "eval_mode": true,
          "training_mode": true,
          "survival_mode": true,
          "pro_tips_fr": null,
          "pro_tips_en": null
        },
        {
          "id_question": 26,
          "label_fr": "Que sont les tableaux et les champs en SQL ?",
          "label_en": "What are tables and fields in SQL?",
          "id_categorie": 1,
          "id_difficulte": 1,
          "eval_mode": true,
          "training_mode": true,
          "survival_mode": true,
          "pro_tips_fr": null,
          "pro_tips_en": null
        },
        {
          "id_question": 27,
          "label_fr": "Qu est-ce qu une clé primaire ?",
          "label_en": "What s a primary key ?",
          "id_categorie": 1,
          "id_difficulte": 1,
          "eval_mode": true,
          "training_mode": true,
          "survival_mode": true,
          "pro_tips_fr": null,
          "pro_tips_en": null
        }
      ]
    ]*/


  }

  changeTheme(content2: any) {
    this.modalService.open(content2, {size: 'xl', ariaLabelledBy: 'modal-basic-title-2'});
  }

  switchTimer() {
    if(this.timer) this.timer = false;
    else this.timer = true;
  }

  onChange(deviceValue: any) {
    this.selectedBac = deviceValue;
    console.log(this.selectedBac)
  }

  constructor(private modalService: NgbModal, private http: HttpClient,private questionService: QuestionService ) {
  }

  ngOnInit(): void {
    this.time = 0;
  }
}
