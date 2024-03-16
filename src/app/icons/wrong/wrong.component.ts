import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-wrong',
  styles: '.wrong { stroke: red }',
  templateUrl: './wrong.component.html'
})
export class WrongIcon {
  @Input() wrong: boolean = false;
}
