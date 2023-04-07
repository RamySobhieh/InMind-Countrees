import { Component } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  faFilter = faFilter;
  isOpened: boolean = false;

  setIsOpened(): void {
    this.isOpened = !this.isOpened;
  }
}
