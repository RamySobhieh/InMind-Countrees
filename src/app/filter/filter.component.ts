import { Component, EventEmitter, Output } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  faFilter = faFilter;
  isOpened: boolean = false;

  @Output() filtersChanged = new EventEmitter<string[]>();
  filters: string[] = [];

  continents: string[] = [
    'Asia',
    'Europe',
    'Africa',
    'North America',
    'South America',
    'Oceania',
  ];

  setIsOpened(): void {
    this.isOpened = !this.isOpened;
  }

  updateFilters(continent: string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.filters.push(continent);
    } else {
      const index = this.filters.indexOf(continent);
      if (index !== -1) {
        this.filters.splice(index, 1);
      }
    }
    this.filtersChanged.emit(this.filters);
  }
}
