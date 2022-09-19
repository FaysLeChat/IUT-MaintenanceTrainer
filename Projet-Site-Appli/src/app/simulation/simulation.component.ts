import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  resultat = 0;
  changement = false;
  constructor() { }

  ngOnInit(): void {
  }

  changerQuestion(){
    if(this.changement == true){
      return (this.changement = false);
    }
    else{
      return (this.changement = true);
    }
  }
  
  ajout(score : number){
    if(document.getElementById('point')){
      this.resultat += score;
    }
    return this.resultat;
  }

}
