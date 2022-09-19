import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import {MatCardModule} from "@angular/material/card";
import { EntrainementComponent } from './entrainement/entrainement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Erreur404Component} from "./erreur404/erreur404.component";
import { SimulationComponent } from './simulation/simulation.component';
import { SurvivalComponent } from './survival/survival.component';


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    EntrainementComponent,
    Erreur404Component,
    SimulationComponent,
    SurvivalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    NgbModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
