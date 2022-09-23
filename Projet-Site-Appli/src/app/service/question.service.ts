import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
}
