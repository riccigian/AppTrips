import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() limit = 10;
  @Input() total = 0;
  @Output() changePage = new EventEmitter<number>();
  @Output() changeLimit = new EventEmitter<number>();

  pagesCount = 0;
  options = [10, 15, 20];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
  }

  onLimitChange(event: Event): void {
    this.limit = +(event.target as HTMLSelectElement).value;
    this.changeLimit.emit(this.limit);
  }
}
