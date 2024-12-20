import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  skip,
  Subscription,
} from 'rxjs';
import { FilterModalComponent } from '.';
import { DEFAULT_DEBOUNCE_TIME, Sort } from '../../models';

@Component({
  selector: 'header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() titleFilter: string;
  @Input() sort: Sort;
  @Input() paginationTotal: number;
  @Output() changeFilter = new EventEmitter<string>();
  @Output() changeSort = new EventEmitter<Sort>();
  @Output() clickTodayTrip = new EventEmitter<void>();
  @ViewChild('filterModal') filterModal: FilterModalComponent;

  public subs = new Subscription();
  public titleFilter$ = new BehaviorSubject<string>('');
  public isFilterMenuOpen = false;

  ngOnInit(): void {
    this.subs.add(
      this.titleFilter$
        .pipe(
          skip(1),
          debounceTime(DEFAULT_DEBOUNCE_TIME),
          distinctUntilChanged()
        )
        .subscribe((titleFilter) => {
          this.changeFilter.emit(titleFilter);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.filterModal.isOpen) {
      const target = event.target as HTMLElement;
      const isClickInside = target.closest('.menu');
      if (!isClickInside) {
        this.toggleSortAndFilterMenu();
      }
    }
  }

  onChangeFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      this.titleFilter$.next(searchTerm);
    }
  }

  toggleSortAndFilterMenu(): void {
    this.filterModal.toggleModal();
  }
}
