import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { GetWorkdayDTO } from '../../models/workday.model';

@Component({
  selector: 'app-card-workday',
  templateUrl: './card-workday.component.html',
  styleUrl: './card-workday.component.scss'
})
export class CardWorkdayComponent {
  @Input() workday: GetWorkdayDTO = {} as GetWorkdayDTO;

  constructor(
    private router: Router
  ) { }

  open() {
    console.log(this.workday);
    this.router.navigate(['/jornadas/' + this.workday.id]);
  }
}
