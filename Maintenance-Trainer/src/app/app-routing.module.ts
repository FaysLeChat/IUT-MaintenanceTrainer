import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcceuilComponent} from "./acceuil/acceuil.component";
import {EntrainementComponent} from "./entrainement/entrainement.component";
import {Erreur404Component} from "./erreur404/erreur404.component";
import { SimulationComponent } from './simulation/simulation.component';
import { SurvivalComponent } from './survival/survival.component';

const routes: Routes = [
  {path: '', component: AcceuilComponent},
  {path: 'entrainement', component: EntrainementComponent},
  {path: 'simulation', component: SimulationComponent},
  {path: 'survival', component: SurvivalComponent},
  {path: '**', component: Erreur404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
