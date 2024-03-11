import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetWorkdayLocationDTO } from '../../models/location.model';

@Component({
  selector: 'app-card-location',
  templateUrl: './card-location.component.html',
  styleUrl: './card-location.component.scss'
})
export class CardLocationComponent {
  @Input() location: GetWorkdayLocationDTO = {} as GetWorkdayLocationDTO;
  @Output() locationOutput = new EventEmitter<GetWorkdayLocationDTO>();

  returnLocation() {
    this.locationOutput.emit(this.location);
  }
}
