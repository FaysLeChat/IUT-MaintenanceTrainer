import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Questions} from "../interfaces/Questions";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getCategorie(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/categories?label_fr=eq.';
    url = url.concat(choix.toString());
    console.log(url)
    return this.http.get(url);
  }
  getQuestionTraining(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/questions?id_categorie=eq.'+choix+'&training_mode=eq.true';
    return this.http.get(url);
  }
  getQuestionTrainingDifficult2(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/questions?id_categorie=eq.'+choix+'&training_mode=eq.true&or=(id_difficulte.eq.1,id_difficulte.eq.2)';
    return this.http.get(url);
  }
  getQuestionsSurvival(): Observable<any> {
    var url = 'http://45.155.170.233:3000/questions?survival_mode=eq.true';
    return  this.http.get(url);
  }
  getReponse(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/reponses?id_question=eq.';
    url = url.concat(choix.toString());
    console.log(url)
    return this.http.get<Questions[]>(url).pipe(map(rep => rep[0]));

  }
  getQuestionSimulation(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/questions?id_categorie=eq.'+choix+"&eval_mode=eq.true";
    return this.http.get(url);
  }


}
