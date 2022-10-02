import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  public maxscore = 100;
  public errorMessage = "";
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

  ajout(score : number) {
    if (this.resultat < this.maxscore && document.getElementById('note')) {
      this.resultat += score;
      return this.resultat;
    } else {
      this.errorMessage = "Score maximum atteint !";
    }
    return 0;
  }

}
