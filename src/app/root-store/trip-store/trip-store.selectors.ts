import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrip from './trip-store.reducers';

export const selectTripState = createFeatureSelector<fromTrip.State>(
  fromTrip.tripFeatureKey
);

/*
 *  Returns if loading is in progress.
 */
export const selectIsLoading = createSelector(
  selectTripState,
  (state) => state.isLoading
);

/*
 *  Returns all trips.
 */
export const selectAllTrips = createSelector(
  selectTripState,
  (state) => state.trips
);

/*
 *  Returns selected trip.
 */
export const selectSelectedTrip = createSelector(
  selectTripState,
  (state) => state.selectedTrip
);

/*
 *  Returns total number of trips.
 */
export const selectTotal = createSelector(
  selectTripState,
  (state) => state.total
);

/*
 *  Returns limit of trips.
 */
export const selectLimit = createSelector(
  selectTripState,
  (state) => state.limit
);

/*
 *  Returns page number.
 */
export const selectPage = createSelector(
  selectTripState,
  (state) => state.page
);

/*
 *  Returns title filter.
 */
export const selectTitleFilter = createSelector(
  selectTripState,
  (state) => state.titleFilter
);

/*
 *  Returns sort.
 */
export const selectSort = createSelector(
  selectTripState,
  (state) => state.sort
);
