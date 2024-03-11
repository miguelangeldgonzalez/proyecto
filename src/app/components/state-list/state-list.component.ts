import { Component } from '@angular/core';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss'
})
export class StateListComponent {
  public stateName: string = '';
}
