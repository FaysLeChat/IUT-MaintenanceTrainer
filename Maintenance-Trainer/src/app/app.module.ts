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

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Overlay} from "./overlay";
import {ToastsContainer} from "./toasts-container.component";

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    EntrainementComponent,
    Erreur404Component,
    SimulationComponent,
    SurvivalComponent,
    Overlay,
    ToastsContainer

  ],
  imports: [
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
