import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  francais = true;
  title = 'Projet-Site-Appli';

  translate(): void {
    this.francais = !this.francais;
    console.log(this.francais);
  }

  public isCollapsed = false;
}
