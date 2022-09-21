import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Questions} from "../interfaces/Questions";

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

  questions!: Questions[];

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

  getQuestion(): Observable<any> {
    return this.http.get('http://45.155.170.233:3000/questions');
  }

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.getQuestion().subscribe(req => this.questions = req);
  }

  ngOnInit(): void {
    this.time = 0;
  }
}
