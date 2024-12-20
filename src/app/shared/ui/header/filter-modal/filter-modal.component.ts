import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Sort, SortByKeys, SortOrderKeys } from '../../..';

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent {
  @Input() sort: Sort;
  @Output() changeSort = new EventEmitter<Sort>();

  public isOpen = false;
  public isSortByMenuOpen = false;
  public sortByOptions = Object.keys(SortByKeys);
  public sortByKeys = SortByKeys;
  public sortAndFilterInfo: Sort = {
    sortBy: SortByKeys.title,
    sortOrder: SortOrderKeys.ASC,
  };
  public isConfirmButtonDisabled = true;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen) {
      const target = event.target as HTMLElement;
      const isClickInside = target.closest('#sortByButton');
      if (!isClickInside) {
        this.isSortByMenuOpen = false;
      }
    }
  }

  toggleModal(): void {
    this.isOpen = !this.isOpen;
    this.isSortByMenuOpen = false;
  }

  onSortByChange(criteria: SortByKeys): void {
    this.sortAndFilterInfo.sortBy = criteria;
    this.isConfirmButtonDisabled = false;
  }

  onSortOrderChange(): void {
    this.sortAndFilterInfo.sortOrder =
      this.sortAndFilterInfo.sortOrder === SortOrderKeys.ASC
        ? SortOrderKeys.DESC
        : SortOrderKeys.ASC;
    this.isConfirmButtonDisabled = false;
  }

  confirm(): void {
    this.toggleModal();
    this.isConfirmButtonDisabled = true;
    this.changeSort.emit({
      sortBy: this.sortAndFilterInfo.sortBy,
      sortOrder: this.sortAndFilterInfo.sortOrder,
    });
  }
}
