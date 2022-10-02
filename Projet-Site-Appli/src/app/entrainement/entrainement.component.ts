import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Questions} from "../interfaces/Questions";
import {Categories} from "../interfaces/Categories";

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
    this.getCategorie(this.theme).subscribe(req => this.categorie = req);
    console.log(JSON.stringify(this.categorie));
  }
  getCategorie(choix : any): Observable<any> {
    var url = 'http://45.155.170.233:3000/categories?label_fr=eq.';
    url = url.concat(choix.toString());
    console.log(url)
    return this.http.get<any>(url);

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


  constructor(private modalService: NgbModal, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.time = 0;
  }
}
