import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'proyecto-sirena';
  public isRootLocation: boolean = false;

  private rootLocations = ['', '/', '/set-password', 'set-password']

  constructor(private router: Router) {
    this.router.events.subscribe(v => {
      if (v instanceof NavigationStart){
        this.rootLocations.forEach(e => {
          this.isRootLocation = v.url.includes(e)
        });

        if (!this.isRootLocation) {
          this.isRootLocation = this.rootLocations.includes(v.url)
        }
      }
    })
  }
}
