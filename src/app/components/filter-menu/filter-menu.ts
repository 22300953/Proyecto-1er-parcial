import { Component, EventEmitter, Output, signal } from '@angular/core';

export type FilterKey = 'todos' | 'pasteles' | 'gelatinas' | 'galletas' | 'pays' | 'otros';

const FILTER_LABELS: Record<FilterKey, string> = {
  todos: 'Todos',
  pasteles: 'Pasteles',
  gelatinas: 'Gelatinas',
  galletas: 'Galletas',
  pays: 'Pays',
  otros: 'Otros',
};

@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [],
  templateUrl: './filter-menu.html',
  styleUrls: ['./filter-menu.css'],
})
export class FilterMenuComponent {
  @Output() filterChange = new EventEmitter<FilterKey>();

  isOpen = signal(false);
  selectedFilter = signal<FilterKey>('todos');
  filterLabels = FILTER_LABELS;
  filters = Object.keys(FILTER_LABELS) as FilterKey[];

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  selectFilter(filter: FilterKey) {
    this.selectedFilter.set(filter);
    this.filterChange.emit(filter);
  }

  isActive(filter: FilterKey): boolean {
    return this.selectedFilter() === filter;
  }
}
