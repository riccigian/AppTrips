import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TripStoreModule } from './trip-store/trip-store.module';

@NgModule({
  imports: [
    CommonModule,
    TripStoreModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
  ],
  declarations: [],
})
export class RootStoreModule {}
