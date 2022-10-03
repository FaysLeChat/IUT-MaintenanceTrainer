import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Questions} from "../interfaces/Questions";
import {QuestionService} from "../service/question.service";
import {Categories} from "../interfaces/Categories";
import {query} from "@angular/animations";
import {Reponses} from "../interfaces/Reponses";

@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.css']
})
export class EntrainementComponent implements OnInit {
  public config = true;
  public errorMessage :string = "";
  public theme : string = "";
  public timer : boolean = false;

  public interval: any;
  public time: number = 0;
  public selectedBac: any = "bac+2";

  questions!: Questions [];
  reponses!: Reponses [];
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
    this.questionService.getQuestionTraining(this.questionService.getCategorie(this.theme)).subscribe(res => {
      this.questions = res;
    }
    );
  }

  ngOnInit(): void {
    this.time = 0;
  }

  
  
  question : number =  Math.floor(Math.random() * 20);
  IdQuestion : number = 1;
  tabQ : number[] = [this.question];

  incIdQuestion(){
    return this.IdQuestion++;
  }

  IncQuestion(questions: Questions[]){
    let bool= true;
    var r =  Math.floor((Math.random() * questions.length));
    while(bool) {
      if (!this.tabQ.includes(r)) {
        this.tabQ.push(r);
        this.incIdQuestion();
        return this.question = r;
      }
      r =  Math.floor((Math.random() * questions.length));
      bool = false;
    }
    this.errorMessage = 'MAX ATTEINT';
    return this.errorMessage;
  }
  
}
