import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Reponses} from "../interfaces/Reponses";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  constructor(private http: HttpClient) { }

  getReponse(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/reponses?id_question=eq.'+choix;
    return this.http.get(url);
  }
}
