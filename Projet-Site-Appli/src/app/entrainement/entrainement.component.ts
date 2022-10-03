import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Questions} from "../interfaces/Questions";
import {QuestionService} from "../service/question.service";
import {ReponseService} from "../service/reponse.service";
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
    this.questionService.getCategorie(choix).subscribe(r => {
      this.questionService.getQuestionTraining(r[0].id_categorie).subscribe(res => {
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
    });
    
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

  constructor(private modalService: NgbModal, private http: HttpClient,private questionService: QuestionService,private reponseService: ReponseService) {
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
    if(this.IdQuestion == questions.length){
      this.errorMessage = 'MAX ATTEINT';
    }
    
    return 0;
  }
  
}
