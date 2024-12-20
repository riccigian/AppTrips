import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Trip } from '../../../../shared';

@Component({
  selector: 'trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripListComponent {
  @Input() isLoading = false;
  @Input() trips: Trip[] = [];
  @Input() currentPage = 0;
  @Input() paginationLimit = 0;
  @Input() paginationTotal = 0;

  @Output() changePage = new EventEmitter<number>();
  @Output() changeLimit = new EventEmitter<number>();
  @Output() tripSelected = new EventEmitter<string>();
}
