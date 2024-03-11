import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'proyecto-sirena';
  public isRootLocation:boolean = false;

  private rootLocations = ['', '/']

  constructor(private router: Router) {
    this.router.events.subscribe(v => {
      if (v instanceof NavigationStart){
        this.isRootLocation = this.rootLocations.includes(v.url);
      }
    })
  }
}
