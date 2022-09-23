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

  categories!: Categories[];
  categorie!: Categories;

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
<<<<<<< Projet-Site-Appli/src/app/entrainement/entrainement.component.ts
    this.questionService.getCategorie(this.theme).subscribe(res => console.log(res[0].id_categorie));
    this.questionService.getCategorie(this.theme).subscribe(res => console.log(res[0].label_fr));
  }
=======
    this.getCategorie(this.theme).subscribe(req => this.categories = req);

    console.log(this.categories[0].id_categorie); // 'liste'

    console.log(this.categories[0]['id_categorie']); // 'titre'


  }
  getCategorie(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/categories?label_fr=eq.';
    url = url.concat(choix.toString());
    console.log(url)
    return this.http.get(url);

  }
  getQuestion(id : any){
    console.log(id);
    var url = 'http://45.155.170.233:3000/questions?id_categorie=eq.';
    url = url.concat(id.toString());
    console.log(url)
  }
>>>>>>> Projet-Site-Appli/src/app/entrainement/entrainement.component.ts

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

  constructor(private modalService: NgbModal, private http: HttpClient, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.time = 0;
  }
}
