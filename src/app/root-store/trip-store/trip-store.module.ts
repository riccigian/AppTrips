import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TripEffect } from './trip-store.effects';
import * as fromTripStore from './trip-store.reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(fromTripStore.tripFeatureKey, fromTripStore.reducer),
    EffectsModule.forFeature([TripEffect]),
  ],
})
export class TripStoreModule {}
