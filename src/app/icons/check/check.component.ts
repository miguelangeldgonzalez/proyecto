import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-check',
  styles: '.check { stroke: green }',
  templateUrl: './check.component.html',
})
export class CheckIcon {
  @Input() check: boolean = false;
}
