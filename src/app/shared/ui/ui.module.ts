import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  ArrayConstructorPipe,
  FilterModalComponent,
  HeaderComponent,
  PaginationComponent,
  TripScoreBadgeComponent,
} from '.';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [
    PaginationComponent,
    HeaderComponent,
    FilterModalComponent,
    TripScoreBadgeComponent,
    ArrayConstructorPipe,
  ],
  exports: [
    TranslateModule,
    PaginationComponent,
    HeaderComponent,
    TripScoreBadgeComponent,
    ArrayConstructorPipe,
    NgxSkeletonLoaderModule,
  ],
})
export class UiModule {}
