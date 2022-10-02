import {Component, Injectable, Injector, NgModule} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {SurvivalComponent} from "./survival/survival.component";

@Component({
  selector: "app-overlay",
  template: `
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title"><i class="bi bi-gear"></i> {{'settings.title' | translate }}</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label>{{'settings.language' | translate }}</label>
            <div class="input-group">
              <select [(ngModel)]="choice" (ngModelChange)="onChange($event)" name="selectLang" class="form-select" aria-label="Select lang">
                <option value="fr">{{'settings.languages.french' | translate }}</option>
                <option value="en">{{'settings.languages.english' | translate }}</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">{{'settings.close' | translate }}</button>
      </div>
    </ng-template>
    <div class="container-fluid" style="position: fixed; bottom: 10px;">
      <div class="row">
        <div class="col-lg-6">
          <button (click)="open(content)" class="btn btn-dark"><i class="bi bi-gear"></i> {{'footerbar.settings' | translate }}</button>
        </div>
        <div class="col" style="text-align: right;">
          <div *ngIf="this.router.url == '/survival'">
            <button *ngIf="checkSurvivalConfig()" class="btn btn-dark" (click)="resetSurvival()"><i class="bi bi-people"></i> RESET (Experimental)</button>
            <button *ngIf="checkSurvivalConfig() && checkSurvivalActiveTimer()" class="btn btn-primary"><i class="bi bi-stopwatch"></i> {{ this.survival_timer }}s</button>
            <button *ngIf="checkSurvivalConfig()" class="btn btn-danger"><i class="bi bi-heart"></i> {{ this.survival_lives }} {{'survival.bar.lives' | translate }}</button>
            <button *ngIf="checkSurvivalConfig()" class="btn btn-warning"><i class="bi bi-people"></i> {{ this.survival_nbplayer }} {{'survival.bar.players' | translate }}</button>
          </div>
        </div>
      </div>
    </div>

  `
})
export class Overlay {
  public survival_lives:any;
  public survival_config:any;
  public survival_activetimer:any;
  public survival_timer:any;
  public survival_nbplayer:any;


  constructor(private modalService: NgbModal, private translate: TranslateService, public router: Router, private survival:Injector) {
    this.choice = localStorage.getItem("locale");
    setInterval(() => {
      this.survival_lives = survival.get(SurvivalComponent).lives;
      this.survival_config = localStorage.getItem('survival_config');
      this.survival_activetimer = localStorage.getItem('survival_activetimer');
      this.survival_timer = survival.get(SurvivalComponent).timer;
      this.survival_nbplayer = localStorage.getItem('survival_nbplayer');
    }, 1000);
  }

  public choice: any;

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onChange(deviceValue: any) {
    localStorage.setItem('locale', deviceValue);
    // @ts-ignore: Object is possibly 'null'.
    this.translate.use(localStorage.getItem('locale').toString());
  }

  checkSurvivalConfig() {
    return localStorage.getItem('survival_config') === 'true';
  }
  checkSurvivalActiveTimer() {
    return localStorage.getItem('survival_activetimer') === 'true';
  }

  resetSurvival() {
    this.survival.get(SurvivalComponent).resetGame();
  }
}
