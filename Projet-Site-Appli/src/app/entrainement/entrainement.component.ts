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
import {Router} from "@angular/router";

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
  public score :number = 0;

  public interval: any;
  public time: number = 0;
  public selectedBac: any = "bac+2";

  categorie : string[] = ["PHP","ProgObjet","Web-Back","Web-Front","Reseau","Basededonnees"];
  questions!: Questions [];
  reponses!: Reponses [];
  tab: any[] = [];
  // @ts-ignore
  langue : string = localStorage.getItem('locale').toString();

  constructor(private modalService: NgbModal, private http: HttpClient,private questionService: QuestionService,private reponseService: ReponseService, private router: Router) {
  }

  ngOnInit(): void {
    this.time = 0;
  }

  endconf(choix:any) {
    if(choix == "all"){
      this.config = false;
      this.modalService.dismissAll();
      console.log(this.theme);
      if(this.timer) {
        this.interval = setInterval(() => {
          this.time++;
        },1000)
      }
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
            var len = this.reponses.length;
            var tmp, i, j;
            for(i = 1; i < len; i++) {
              //stocker la valeur actuelle
              tmp = this.reponses[i];
              j = i - 1
              while (j >= 0 && this.reponses[j].id_question > tmp.id_question) {
                // déplacer le nombre
                this.reponses[j+1] = this.reponses[j];
                j--
              }
              //Insère la valeur temporaire à la position
              //correcte dans la partie triée.
              this.reponses[j+1] = tmp
            }

          });
        }
      });
    }else{
      if(choix == "random"){
        let n : number = Math.floor(Math.random() * 10);
        while(n >= this.categorie.length){
          n = Math.floor(Math.random() * 10);
        }
        this.theme = this.categorie[n];
      }else{
        this.theme = choix;
      }
      this.config = false;
      this.modalService.dismissAll();
      console.log(this.theme);
      if(this.timer) {
        this.interval = setInterval(() => {
          this.time++;
        },1000)
      }
      this.questionService.getCategorie(this.theme).subscribe(r => {
        if(this.selectedBac =="bac+2"){
          this.questionService.getQuestionTrainingDifficult2(r[0].id_categorie).subscribe(res => {
          this.questions = res;
          this.reponses = [];
          console.log(this.questions);
          let i = [];
          let y = 0;
          for (let r of this.questions) {
            this.reponseService.getReponse(r.id_question).subscribe( resR => {
                this.reponses.push(resR[0]);
                this.reponses.push(resR[1]);
                this.reponses.push(resR[2]);
                this.reponses.push(resR[3]);
                console.log(this.reponses);

                // for(let i = 0; i< this.reponses.length-1 ; i++){
                //     if(this.reponses[i].id_question > this.reponses[i+1].id_question){
                //       var temp;
                //       temp = this.reponses[i].id_question;
                //       this.reponses[i].id_question = this.reponses[i+1].id_question;
                //       this.reponses[i+1].id_question = temp;
                //     }
                //   }
                var len = this.reponses.length;
                var tmp, i, j;
                for(i = 1; i < len; i++) {
                  //stocker la valeur actuelle
                  tmp = this.reponses[i];
                  j = i - 1
                  while (j >= 0 && this.reponses[j].id_question > tmp.id_question) {
                    // déplacer le nombre
                    this.reponses[j+1] = this.reponses[j];
                    j--
                  }
                  //Insère la valeur temporaire à la position
                  //correcte dans la partie triée.
                  this.reponses[j+1] = tmp
                }
              }
            );
          }
        });
        }else {
          this.questionService.getQuestionTraining(r[0].id_categorie).subscribe(res => {
            this.questions = res;
            this.reponses = [];
            console.log(this.questions);
            let i = [];
            let y = 0;
            for (let r of this.questions) {
              this.reponseService.getReponse(r.id_question).subscribe(resR => {
                  this.reponses.push(resR[0]);
                  this.reponses.push(resR[1]);
                  this.reponses.push(resR[2]);
                  this.reponses.push(resR[3]);
                  console.log(this.reponses);

                  // for(let i = 0; i< this.reponses.length-1 ; i++){
                  //     if(this.reponses[i].id_question > this.reponses[i+1].id_question){
                  //       var temp;
                  //       temp = this.reponses[i].id_question;
                  //       this.reponses[i].id_question = this.reponses[i+1].id_question;
                  //       this.reponses[i+1].id_question = temp;
                  //     }
                  //   }
                  var len = this.reponses.length;
                  var tmp, i, j;
                  for (i = 1; i < len; i++) {
                    //stocker la valeur actuelle
                    tmp = this.reponses[i];
                    j = i - 1
                    while (j >= 0 && this.reponses[j].id_question > tmp.id_question) {
                      // déplacer le nombre
                      this.reponses[j + 1] = this.reponses[j];
                      j--
                    }
                    //Insère la valeur temporaire à la position
                    //correcte dans la partie triée.
                    this.reponses[j + 1] = tmp
                  }
                }
              );
            }
          });
        }
      });
    }

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


  incIdQuestion(){
    return this.IdQuestion++;
  }

  IncQuestion(reponse: Reponses, n: number){
    this.verificationReponse(reponse, n);
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

  verificationReponse(reponse: Reponses, n: number) {
    if(reponse.valid == true) {
      this.score += 1;
    }

    if(this.tabQ.length == n && this.langue == "fr"){
      alert("Entraînement terminé ! Ton score est de : "+this.score+"/"+this.questions.length);
      this.router.navigateByUrl('');
    }
    if(this.tabQ.length == n && this.langue == "en"){
      alert("Training complete! Your score is : "+this.score+"/"+this.questions.length);
      this.router.navigateByUrl('');
    }


  }
}
